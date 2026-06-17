const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const bd = require('./config/bd');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'login.html')
    );
});

app.get('/teste-banco', (req, res) => {

    bd.query(
        'SELECT 1 + 1 AS resultado',
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro no banco'
                });
            }

            res.json(resultado);

        }
    );

});

app.post('/cadastro', async (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    }

    try {

        bd.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email],
            async (erro, resultado) => {

                if (erro) {
                    return res.status(500).json({
                        mensagem: 'Erro no servidor'
                    });
                }

                if (resultado.length > 0) {
                    return res.status(400).json({
                        mensagem: 'Este email já está cadastrado'
                    });
                }

                const senhaHash = await bcrypt.hash(senha, 10);

                bd.query(
                    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                    [nome, email, senhaHash],
                    (erroInsert) => {

                        if (erroInsert) {

                            console.error(erroInsert);

                            return res.status(500).json({
                                mensagem: erroInsert.message
                            });

                        }

                        return res.json({
                            mensagem: 'Cadastro realizado com sucesso',
                            nome,
                            email
                        });

                    }
                );

            }
        );

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro interno'
        });

    }

});

app.post('/login', (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    }

    bd.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email],
        async (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    mensagem: 'Erro no servidor'
                });
            }

            if (resultado.length === 0) {
                return res.status(400).json({
                    mensagem: 'Email não encontrado'
                });
            }

            const usuario = resultado[0];

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {
                return res.status(400).json({
                    mensagem: 'Senha incorreta'
                });
            }

            return res.json({
                mensagem: 'Login realizado com sucesso',
                nome: usuario.nome,
                email: usuario.email
            });

        }
    );

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});