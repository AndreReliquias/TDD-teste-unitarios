const assert = require('chai').assert; //assert
const sinon = require('sinon'); //mocks
const nock = require('nock'); //http mocks
const phantom = require('phantom');

const calc = require('../soma.js');


const expRegHtml = /<html>/;
const expRegHtmlErrado = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/;

const primeiroTeste = 1 + 1;
const segundoTeste = [1, 2, 3, 4, 5];
const terceiroTeste = [6, 7, 8, 9];
const quartoTeste = { attr1: 13 };
const quintoTeste = { attr3: 13 };
const sextoTeste = new RegExp('([Invesstools])');

const setimoTeste = [
    [1, 1],
    [2, 2],
    [4, 5],
    [6, 7],
    [9, 9]
];

// const oitavoTeste = nock('https://google.com.br').persist().get('/').reply(200).filteringRequestBody(/(<html>)/);
// console.log(oitavoTeste);

describe('Testes', () => {
    it('1+1 é igual a 2', () => {
        assert.equal(primeiroTeste, 1 + 1);
    });

    it('1+1 não é igual a 7', () => {
        assert.notEqual(primeiroTeste, 7);
    });

    it('O elemento 3 está contido no array', () => {
        assert.include(segundoTeste, 3);
    });

    it('No array o elemento “TDD é Top” não está contido', () => {
        assert.notInclude(terceiroTeste, 'TDD é Top');
    });

    it('O objeto possui o atributo ‘attr1’', () => {
        assert.hasAnyKeys(quartoTeste, 'attr1');
    });

    it('O objeto não possui o atributo ‘attr1’', () => {
        assert.doesNotHaveAnyKeys(quintoTeste, 'attr1');
    });

    it('A regex realiza match com a primeira frase', () => {
        assert.match('Não existe concorrente com a investtools para a melhor empresa para se estagiar.', sextoTeste);
    });

    it('A regex realiza match com a segunda frase', () => {
        assert.match('Investtools cuida melhor dos seus estagiários que a bloomberg.', sextoTeste);
    });

    it('A regex realiza match com a terceira frase', () => {
        assert.match('Somos parte do Programa de Formação da Investtools', sextoTeste);
    });

    setimoTeste.forEach(variavel => {
        it(`Soma de ${variavel[0]} + ${variavel[1]}`, () => {
            assert.equal(calc.soma(variavel[0], variavel[1]), variavel[0] + variavel[1]);
        });
    });

    async function carregar() {
        console.log('entrou na função');
        const url = "https://www.google.com";
        const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
        const page = await instance.createPage();
        const status = await page.open(url);

        if (status !== 'success') {
            console.error(status);
            await instance.exit();
            return;
        }

        const content = await page.property('content');

        await instance.exit();
        // console.log(content); //HTML
        return content;
    }

    ///////////////////////////////

    let dados = carregar();
    // console.log(dados); //Promise { <pending> }
    // dados.then(resposta => {
    //     // console.log(resposta); //HTML
    //     console.log('antes do it');
    //     describe('Teste HTML', (resposta) => {
    //         it('O html da página do google contém a tag <body>', (resposta) => {
    //             console.log('após o it');
    //             assert.match(resposta, htmlReg);
    //         })
    //     })
    // });

    // ///////////////////////////////

    // funcao2();
    // async function funcao2() {
    //     let resultadoFuncao2 = await carregar();

    // }

    //////////////////////////////

    // let seraQuePega = dados.then((resposta) => {
    //     // console.log('HTML REG ---------------------', htmlReg);
    //     return resposta;
    // }).then(
    //     );

    // console.log('Pegou?', seraQuePega);

    //////////////////////////////
    dados.then(
        retorno => {
            it('O html da página do google contém a tag <body>', (retorno) => {
                // console.log('após o it', htmlReg);
                console.log(resposta);
                assert.match(resposta, /<html>/);
            })
        }
    );
})