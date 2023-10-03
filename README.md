# Projeto de Processamento Gráfico

O projeto implementa a visualização de um cena pela perspectiva de quatro câmeras diferentes. A cena consiste de:

- Um pato de borracha, carregado a partir de um modelo 3D externo, iluminado por uma iluminação direcional;
- Dois anéis (toros), cuja cor flutua entre branco e vermelho (feito através de um *shader* personalizado) rotacionando em torno do pato com velocidades aleatórias;
- Fundo cor azul celeste.

![Example of execution](img/example.gif)

### Modo de Interação

É possível alternar entre as câmeras usando as teclas ↑ e ↓.

## Especificações Atendidas

- Visualização de um objeto 3D por membro: pato de borracha (1/3), primeiro anel (2/3) e segundo anel (3/3). O pato foi posicionado através das propriedades *position* e *rotation* do objeto no JS e os anéis através dos parâmetros passados na instanciação de suas geometrias.
- Utilização de um shader próprio em um dos objetos: foram usados em ambos os anéis um *vertex shader* padrão e um *fragment shader* que faz com que a cor do material flutue entre vermelho e branco. Isto foi feito através de uma função seno que define a proporção entre branco e vermelho em função do tempo. A variável de tempo é incrementada pelo próprio programa em JS através do uso de *uniforms*.
- Definição de pelo menos duas câmeras: foram definidas quatro câmeras.
- Movimento simples de pelo menos um objeto: ambos os anéis rotacional em torno dos três eixos com velocidades aleatórias.
- Documentação no GitHub através de um README: 📍
