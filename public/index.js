function adicionaItem(){
    let addInfo = {};
    let databaseRef = firebase.database().ref();

    const temperatura = $('#input-temperatura').val();
    const umidade = $('#input-umidade').val();
    const velocidadeVento = $('#input-velocidade').val();

    const newId = databaseRef.child('dados').push().key;

    if(temperatura && umidade && velocidadeVento){

        addInfo['/dados/' + newId] = {
            temperatura,
            umidade,
            velocidadeVento
        };
        
        databaseRef.update(addInfo)
            .then(() => {
                return true
            })
            .catch((err) => {
                return err
            })

        $('#input-temperatura').val('');
        $('#input-umidade').val('');
        $('#input-velocidade').val('');
    }
}

async function listaDados() {
    let databaseRef = firebase.database().ref();
    const dados = databaseRef.child('dados');

    let tbody = document.getElementById('corpoDados');
    let ultimaTemperatura = document.getElementById('ultimaTemperatura')
    let ultimaUmidade = document.getElementById('ultimaUmidade')
    let ultimaVelocidade = document.getElementById('ultimaVelocidade')

    dados.on("value", snap => {
        let dadosColetados = snap.val();
        dadosColetados = Object.values(dadosColetados);

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        ultimaTemperatura.textContent = dadosColetados[dadosColetados.length - 1].temperatura + ' ºC';
        ultimaUmidade.textContent = dadosColetados[dadosColetados.length - 1].umidade + '%';
        ultimaVelocidade.textContent = dadosColetados[dadosColetados.length - 1].velocidadeVento  + ' km/h';

        dadosColetados.map((item, index) => {
            
            let trDados = document.createElement('tr');
            trDados.setAttribute('id', 'dado' + index + 1);
            tbody.appendChild(trDados);
            
            let thDadoIndex = document.createElement('th');
            let tdDadoTemperatura = document.createElement('td');
            let tdDadoUmidade = document.createElement('td');
            let tdDadoVelocidade = document.createElement('td');

            thDadoIndex.textContent = index + 1;
            tdDadoVelocidade.textContent = item.velocidadeVento + ' km/h';
            tdDadoUmidade.textContent = item.umidade + '%';
            tdDadoTemperatura.textContent = item.temperatura + ' ºC';
            
            trDados.appendChild(thDadoIndex);
            trDados.appendChild(tdDadoVelocidade);
            trDados.appendChild(tdDadoUmidade);
            trDados.appendChild(tdDadoTemperatura);
        })

    });
}