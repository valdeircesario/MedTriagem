import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitações sem origem (como aplicativos móveis ou solicitações curl)
    if (!origin) return callback(null, true);
    
    // Verifique se a origem é localhost com qualquer porta
    if (origin.match(/^http:\/\/localhost:[0-9]+$/)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Middleware de autenticação
const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ mensagem: 'Acesso negado' });

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (erro) {
    res.status(403).json({ mensagem: 'Token inválido' });
  }
};

// Rota de cadastro de usuário
app.post('/api/usuarios/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, endereco, telefone, dataNascimento } = req.body;

    // Verificar se usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Criar usuário
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        endereco,
        telefone,
        dataNascimento: new Date(dataNascimento),
      }
    });

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: 'usuario' }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    //alert


    res.status(201).json({ 
      mensagem: 'Usuário cadastrado com sucesso',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }

    
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Rota de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha, tipoUsuario } = req.body;
    
    let usuario;
    let role;
    
    if (tipoUsuario === 'admin') {
      usuario = await prisma.admin.findUnique({ where: { email } });
      role = 'admin';
    } else {
      usuario = await prisma.usuario.findUnique({ where: { email } });
      role = 'usuario';
    }

    if (!usuario) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Senha incorreta' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ 
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Rota de triagem
app.post('/api/triagens', autenticarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { diabetico, hipertenso, obeso, febre, temperatura, temDor, localDor, peso, idade } = req.body;

    // Calcular pontuação e gravidade
    let pontuacao = 0;
    
    // Adicionar pontos baseados nas condições
    if (diabetico) pontuacao += 2;
    if (hipertenso) pontuacao += 2;
    if (obeso) pontuacao += 1;
    
    // Pontos para febre baseados na temperatura
    if (febre) {
      if (temperatura >= 39) pontuacao += 3;
      else if (temperatura >= 38) pontuacao += 2;
      else pontuacao += 1;
    }
    
    // Pontos para dor
    if (temDor) pontuacao += 2;
    
    // Ajustar pontuação baseada na idade
    if (idade > 65) pontuacao += 2;
    else if (idade < 12) pontuacao += 1;

    // Determinar gravidade
    let gravidade = 'Leve';
    if (pontuacao >= 7) {
      gravidade = 'Crítico';
    } else if (pontuacao >= 4) {
      gravidade = 'Grave';
    }

    // Salvar triagem
    const triagem = await prisma.triagem.create({
      data: {
        usuarioId,
        diabetico,
        hipertenso,
        obeso,
        febre,
        temperatura: febre ? temperatura : null,
        temDor,
        localDor: temDor ? localDor : null,
        peso,
        idade,
        pontuacao,
        gravidade
      }
    });

    res.status(201).json({
      mensagem: 'Triagem registrada com sucesso',
      triagem
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Obter todas as triagens (para admin)
app.get('/api/admin/triagens', autenticarToken, async (req, res) => {
  try {
    // Verificar se é admin
    if (req.usuario.role !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    const triagens = await prisma.triagem.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        },
        consultas: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    });

    res.status(200).json(triagens);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Obter triagens do usuário logado
app.get('/api/usuario/triagens', autenticarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const triagens = await prisma.triagem.findMany({
      where: { usuarioId },
      orderBy: {
        criadoEm: 'desc'
      }
    });

    res.status(200).json(triagens);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Criar consulta (admin)
app.post('/api/admin/consultas', autenticarToken, async (req, res) => {
  try {
    // Verificar se é admin
    if (req.usuario.role !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    const adminId = req.usuario.id;
    const { usuarioId, triagemId, data, hora, local, especialidade, medico } = req.body;

    const consulta = await prisma.consulta.create({
      data: {
        usuarioId,
        adminId,
        triagemId,
        data: new Date(data),
        hora,
        local,
        especialidade,
        medico
      }
    });

    res.status(201).json({
      mensagem: 'Consulta agendada com sucesso',
      consulta
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Confirmar consulta (usuário)
app.put('/api/usuario/consultas/:id/confirmar', autenticarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const consultaId = parseInt(req.params.id);

    // Verificar se a consulta pertence ao usuário
    const consulta = await prisma.consulta.findFirst({
      where: {
        id: consultaId,
        usuarioId
      }
    });

    if (!consulta) {
      return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    }

    // Atualizar confirmação
    const consultaAtualizada = await prisma.consulta.update({
      where: { id: consultaId },
      data: { confirmada: true }
    });

    res.status(200).json({
      mensagem: 'Consulta confirmada com sucesso',
      consulta: consultaAtualizada
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Obter consultas do usuário logado
app.get('/api/usuario/consultas', autenticarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const consultas = await prisma.consulta.findMany({
      where: { usuarioId },
      include: {
        triagem: true
      },
      orderBy: {
        data: 'asc'
      }
    });

    res.status(200).json(consultas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Obter todas as consultas (admin)
app.get('/api/admin/consultas', autenticarToken, async (req, res) => {
  try {
    // Verificar se é admin
    if (req.usuario.role !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    const consultas = await prisma.consulta.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        },
        triagem: true
      },
      orderBy: {
        data: 'asc'
      }
    });

    res.status(200).json(consultas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Criar histórico médico (admin)
app.post('/api/admin/historico-medico', autenticarToken, async (req, res) => {
  try {
    // Verificar se é admin
    if (req.usuario.role !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    const adminId = req.usuario.id;
    const { usuarioId, consultaId, diagnostico, conclusao } = req.body;

    // Verificar se já existe histórico para esta consulta
    const historicoExistente = await prisma.historicoMedico.findFirst({
      where: { consultaId }
    });

    if (historicoExistente) {
      return res.status(400).json({ mensagem: 'Já existe um histórico para esta consulta' });
    }

    const historico = await prisma.historicoMedico.create({
      data: {
        usuarioId,
        adminId,
        consultaId,
        diagnostico,
        conclusao
      }
    });

    res.status(201).json({
      mensagem: 'Histórico médico registrado com sucesso',
      historico
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Obter histórico médico do usuário logado
app.get('/api/usuario/historico-medico', autenticarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const historicos = await prisma.historicoMedico.findMany({
      where: { usuarioId },
      include: {
        consulta: {
          include: {
            triagem: true
          }
        }
      },
      orderBy: {
        criadoEm: 'desc'
      }
    });

    res.status(200).json(historicos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});