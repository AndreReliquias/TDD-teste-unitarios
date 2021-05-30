const nock = require('nock'); //http mocks
const axios = require('axios').default;

const calc = require('../soma.js');

const primeiroTeste = 1 + 1;
const segundoTeste = [1, 2, 3, 4, 5];
const terceiroTeste = [6, 7, 8, 9];
const quartoTeste = { attr1: 13 };
const quintoTeste = { attr3: 13 };
const sextoTeste = /([Invesstools])/;
const setimoTeste = [
    [1, 1],
    [2, 2],
    [4, 5],
    [6, 7],
    [9, 9]
];
const oitavoTeste = /[(<body>)(</body>)(<body)]/;

describe('Testes', () => {
    test('1+1 é igual a 2', () => {
        expect(primeiroTeste).toBe(2);
    });

    test('1+1 não é igual a 7', () => {
        expect(primeiroTeste).not.toBe(7);
    });

    it('O elemento 3 está contido no array', () => {
        expect(segundoTeste).toContain(3);
    });

    it('No array o elemento “TDD é Top” não está contido', () => {
        expect(terceiroTeste).not.toContain('TDD é Top');
    });

    it('O objeto possui o atributo ‘attr1’', () => {
        expect(quartoTeste).toHaveProperty('attr1');
    });

    it('O objeto não possui o atributo ‘attr1’', () => {
        expect(quintoTeste).not.toHaveProperty('attr1');
    });

    it('A regex realiza match com a primeira frase', () => {
        expect('Não existe concorrente com a investtools para a melhor empresa para se estagiar.').toMatch(sextoTeste);
    });

    it('A regex realiza match com a segunda frase', () => {
        expect('Investtools cuida melhor dos seus estagiários que a bloomberg.').toMatch(sextoTeste);
    });

    it('A regex realiza match com a terceira frase', () => {
        expect('Somos parte do Programa de Formação da Investtools').toMatch(sextoTeste);
    });

    setimoTeste.forEach(variavel => {
        it(`Soma de ${variavel[0]} + ${variavel[1]}`, () => {
            expect(calc.soma(variavel[0], variavel[1])).toBe(variavel[0] + variavel[1]);
        });
    });

    it('O html da página do google contém a tag <body>', async() => {
        nock('https://google.com.br')
            .get('/')
            .reply(200, '<body> </body>');
        const { data } = await axios.get('https://google.com.br/');
        expect(data).toMatch(oitavoTeste);
    });
});