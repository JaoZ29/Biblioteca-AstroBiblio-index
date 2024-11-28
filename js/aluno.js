async function enviaFormulario() {
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": document.querySelectorAll("input")[2].value,
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": document.querySelectorAll("input")[5].value
    }
    
        try {
            const respostaServidor = await fetch("http://localhost:3333/novo/alunos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alunoDTO)
            });
    
            if (!respostaServidor.ok) {
                throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador")
            }
    
            alert("Aluno cadastrado com sucesso!");
        } catch (error) {
            console.log(error);
            alert(`Erro ao se comunicar com o servidor. ${error}`);
        }
    }

    async function recuperarListaAlunos() {
        try {
            const respostaServidor = await fetch("http://localhost:3333/lista/alunos");
    
            if(!respostaServidor.ok) {
                throw new Error('Erro ao comunicar com o servidor.');
            }
    

            const listaDeAlunos = await respostaServidor.json();
    
            console.log(listaDeAlunos);
            criarTabelaAlunos(listaDeAlunos);
        } catch (error) {
            console.log('Erro ao comunicar com o servidor');
            console.log(error);
        }
    }
    
    async function criarTabelaAlunos(alunos) {
        const tbody = document.querySelector('tbody');
        alunos.forEach(alunos => {
            const tr = document.createElement('tr');
    
            const tdIdAluno = document.createElement('td');
            tdIdAluno.innerHTML = alunos.idAluno;
            tr.appendChild(tdIdAluno);

            const tdRa = document.createElement('td');
            tdRa.innerHTML = alunos.ra;
            tr.appendChild(tdRa);
    
            const tdNome = document.createElement('td');
            tdNome.innerHTML = alunos.nome;
            tr.appendChild(tdNome);
    
            const tdSobrenome = document.createElement('td');
            tdSobrenome.innerHTML = alunos.sobrenome;
            tr.appendChild(tdSobrenome);
    
            const tdDataNascimento = document.createElement('td');
            tdDataNascimento.innerHTML = new Date (alunos.dataNascimento).toLocaleDateString('pt-br');
            tr.appendChild(tdDataNascimento);
    
            const tdEmail = document.createElement('td');
            tdEmail.innerHTML = alunos.email;
            tr.appendChild(tdEmail);

            const tdEndereco = document.createElement('td');
            tdEndereco.innerHTML = alunos.endereco;
            tr.appendChild(tdEndereco);
    
            const tdCelular = document.createElement('td');
            tdCelular.innerHTML = alunos.celular;
            tr.appendChild(tdCelular);
    
    
            const tdAcoes = document.createElement('td');
            const imgEditar = document.createElement('img');
            imgEditar.src = 'assets/icons/pencil-square.svg';
            imgEditar.alt = 'Editar';

            const imgExcluir = document.createElement('img');
            imgExcluir.src = 'assets/icons/trash-fill.svg';
            imgExcluir.alt = 'Excluir';
    
            tdAcoes.appendChild(imgEditar);
            tdAcoes.appendChild(imgExcluir);
            tr.appendChild(tdAcoes);
    
            tbody.appendChild(tr);
        })
    }