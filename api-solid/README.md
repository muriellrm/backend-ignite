# App

Gym pass app.

## RF (Requisitos Funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter o histórico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RN (Regras de Negócios)

- [ ] O usuario não deve poder se cadastra com um e-mail duplicado;
- [ ] O usuario não deve poder dois check-ins no mesmo dia;
- [ ] O usuario não pode fazer checkin-se nao estimar perto (100m) da academia;
- [ ] O check-in deve ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF (Requisitos não-Funcionais)

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O Usuario deve ser identificado por um JWT (Json Web Token);