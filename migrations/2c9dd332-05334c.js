
module.exports.id = '2c9dd332.05334c';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow 2c9dd332.05334c update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"2c9dd332.05334c","type":"flows"}, {
    $set: {"path":"2c9dd332.05334c","body":[{"id":"5a35929d.0a716c","type":"http in","z":"2c9dd332.05334c","name":"create addr","url":"/addr","method":"post","upload":false,"swaggerDoc":"","x":110,"y":140,"wires":[["4ae0a952.a4e188"]]},{"id":"27b27b8e.9827a4","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo create addr","mode":"1","requestType":"1","dbAlias":"primary.accounts","x":690,"y":140,"wires":[["11cfb0e5.3b0e2f","e1327500.d3c0d8","1097d605.d7a2ea"]]},{"id":"65927d71.4e8c44","type":"http in","z":"2c9dd332.05334c","name":"remove addr","url":"/addr","method":"delete","upload":false,"swaggerDoc":"","x":90,"y":540,"wires":[["316484c0.63001c"]]},{"id":"d0426981.27e8a8","type":"http response","z":"2c9dd332.05334c","name":"","statusCode":"","x":1192.000057220459,"y":511.0001029968262,"wires":[]},{"id":"7c68e0a0.c140d","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo","mode":"1","requestType":"2","dbAlias":"primary.accounts","x":586.0000152587891,"y":545.0000400543213,"wires":[["d8f7fe8a.d1b61"]]},{"id":"cdd0bdcd.24b59","type":"function","z":"2c9dd332.05334c","name":"transform output","func":"\nlet factories = global.get(\"factories\"); \n\nif(msg.payload.error){\n    msg.payload = factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;","outputs":1,"noerr":0,"x":951.0000991821289,"y":523.0001029968262,"wires":[["d0426981.27e8a8"]]},{"id":"316484c0.63001c","type":"function","z":"2c9dd332.05334c","name":"transform params","func":"const prefix = global.get('settings.mongo.accountPrefix');\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [{\n       address: msg.payload.address\n   }, {isActive: false}]\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":417.99999237060547,"y":546.0000801086426,"wires":[["7c68e0a0.c140d"]]},{"id":"468de3dc.eb162c","type":"http in","z":"2c9dd332.05334c","name":"balance","url":"/addr/:addr/balance","method":"get","upload":false,"swaggerDoc":"","x":90,"y":720,"wires":[["6731d0f7.68fb4"]]},{"id":"6731d0f7.68fb4","type":"function","z":"2c9dd332.05334c","name":"transform params","func":"const prefix = global.get('settings.mongo.accountPrefix');\n\nmsg.payload = {\n    model: `${prefix}Account`,  \n    request: {\n       address: msg.req.params.addr\n   }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":292.500003814698,"y":719.99999809265,"wires":[["a66b89d5.08b868"]]},{"id":"a66b89d5.08b868","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.accounts","x":482.50000381469795,"y":721.24999904632,"wires":[["97ae203e.df01a"]]},{"id":"6e227f25.b210e","type":"http response","z":"2c9dd332.05334c","name":"","statusCode":"","x":911.250007629395,"y":719.99999904632,"wires":[]},{"id":"e859d127.685df","type":"catch","z":"2c9dd332.05334c","name":"","scope":["c0a32965.e18618","1dbd7f6c.ccca81","468de3dc.eb162c","5a35929d.0a716c","b6f716b2.e895e8","32e96375.e31dbc","344c4f71.cda97","b84adab9.245598","e3f195aa.4054b8","921b5d7c.258d8","9458cde6.1f529","6e227f25.b210e","d0426981.27e8a8","ea5897e6.c67548","e69266cd.e2b688","6ccd77f0.9bca48","7c68e0a0.c140d","a66b89d5.08b868","d8695d68.8bab2","547d0ad7.ffb894","f2ca34c2.42cb08","cea9fdeb.9c011","65927d71.4e8c44","e1327500.d3c0d8","11cfb0e5.3b0e2f","27c64d64.24efd2","25d921b8.67808e","3d20f750.413ac8","cdd0bdcd.24b59","d514484d.766a68","6731d0f7.68fb4","316484c0.63001c","287bc20e.b9bb2e","4891676a.f38f98"],"x":200,"y":940,"wires":[["547d0ad7.ffb894","3d20f750.413ac8"]]},{"id":"547d0ad7.ffb894","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"console":"false","complete":"error","x":317.076400756836,"y":866.347267150879,"wires":[]},{"id":"4ae0a952.a4e188","type":"async-function","z":"2c9dd332.05334c","name":"calc balance","func":"\n const prefix = global.get('settings.mongo.accountPrefix');\n\nmsg.address = msg.payload.address.replace(/[^\\w\\s]/gi, '');\n\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.address,\n       isActive: true\n   }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":450,"y":140,"wires":[["27b27b8e.9827a4"]]},{"id":"cea9fdeb.9c011","type":"amqp in","z":"2c9dd332.05334c","name":"post addresses","topic":"${config.rabbit.serviceName}.account.create","iotype":"3","ioname":"events","noack":"1","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":120,"y":200,"wires":[["921b5d7c.258d8"]]},{"id":"921b5d7c.258d8","type":"function","z":"2c9dd332.05334c","name":"","func":"\nmsg.payload = JSON.parse(msg.payload);\n\nreturn msg;","outputs":1,"noerr":0,"x":310,"y":200,"wires":[["4ae0a952.a4e188"]]},{"id":"412afa3f.53ef14","type":"catch","z":"2c9dd332.05334c","name":"","scope":["4ae0a952.a4e188"],"x":100,"y":280,"wires":[["9458cde6.1f529"]]},{"id":"c46dd171.28a02","type":"catch","z":"2c9dd332.05334c","name":"","scope":["27b27b8e.9827a4"],"x":401,"y":54,"wires":[["25d921b8.67808e"]]},{"id":"25d921b8.67808e","type":"function","z":"2c9dd332.05334c","name":"transform","func":"const prefix = global.get('settings.mongo.accountPrefix');\n \nlet factories = global.get(\"factories\"); \nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nif(error.code !== 11000)\nthrow new Error();\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [\n        {address: msg.payload.request.address}, \n        {$set:{ isActive: true}}\n        ]\n   \n};\n\nreturn msg;","outputs":1,"noerr":0,"x":600,"y":60,"wires":[["6ccd77f0.9bca48"]]},{"id":"6ccd77f0.9bca48","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo","mode":"1","requestType":"2","dbAlias":"primary.accounts","x":810,"y":60,"wires":[["e1327500.d3c0d8"]]},{"id":"9458cde6.1f529","type":"function","z":"2c9dd332.05334c","name":"","func":"const factories = global.get('factories');\nconst prefix = global.get('settings.mongo.accountPrefix');\nconst _ = global.get('_');\n\nmsg.address = msg.payload.address.replace(/[^\\w\\s]/gi, '');\n\nmsg.fallback = true;\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.address,\n       balance: {\n           confirmed: 0,\n           unconfirmed: 0,\n           vested: 0\n       },\n       mosaics: {},\n       isActive: true\n       }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":250,"y":280,"wires":[["27b27b8e.9827a4"]]},{"id":"b6f716b2.e895e8","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}.account.balance","iotype":"3","ioname":"events","server":"","servermode":"1","x":1130,"y":320,"wires":[]},{"id":"11cfb0e5.3b0e2f","type":"switch","z":"2c9dd332.05334c","name":"","property":"fallback","propertyType":"msg","rules":[{"t":"true"}],"checkall":"true","outputs":1,"x":853.1875438690186,"y":319.5416946411133,"wires":[["b84adab9.245598"]]},{"id":"b84adab9.245598","type":"function","z":"2c9dd332.05334c","name":"","func":"\nif(msg.amqpMessage)\n    msg.amqpMessage.ack();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;","outputs":1,"noerr":0,"x":990,"y":320,"wires":[["b6f716b2.e895e8"]]},{"id":"ea5897e6.c67548","type":"http response","z":"2c9dd332.05334c","name":"","statusCode":"","x":1330,"y":140,"wires":[]},{"id":"d514484d.766a68","type":"function","z":"2c9dd332.05334c","name":"transform output","func":"\nlet factories = global.get(\"factories\"); \n\nif(msg.payload.error){\n    msg.payload = msg.payload.error.code === 11000 ? \n    factories.messages.address.existAddress :\n    factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;","outputs":1,"noerr":0,"x":1120,"y":140,"wires":[["ea5897e6.c67548"]]},{"id":"344c4f71.cda97","type":"function","z":"2c9dd332.05334c","name":"","func":"\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;","outputs":1,"noerr":0,"x":990,"y":220,"wires":[["32e96375.e31dbc"]]},{"id":"e1327500.d3c0d8","type":"switch","z":"2c9dd332.05334c","name":"","property":"amqpMessage","propertyType":"msg","rules":[{"t":"null"},{"t":"nnull"}],"checkall":"true","outputs":2,"x":930,"y":140,"wires":[["d514484d.766a68"],["344c4f71.cda97"]]},{"id":"32e96375.e31dbc","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}.account.created","iotype":"3","ioname":"events","server":"","servermode":"1","x":1130,"y":220,"wires":[]},{"id":"287bc20e.b9bb2e","type":"amqp in","z":"2c9dd332.05334c","name":"update balance addresses","topic":"${config.rabbit.serviceName}.account.balance","iotype":"3","ioname":"events","noack":"0","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":130,"y":460,"wires":[["4891676a.f38f98"]]},{"id":"4891676a.f38f98","type":"async-function","z":"2c9dd332.05334c","name":"update calc balance","func":"msg.payload = JSON.parse(msg.payload);\nmsg.address = msg.payload.address.replace(/[^\\w\\s]/gi, '');\nreturn msg;","outputs":1,"noerr":0,"x":380,"y":452.0000238418579,"wires":[["1097d605.d7a2ea"]]},{"id":"e69266cd.e2b688","type":"http response","z":"2c9dd332.05334c","name":"","statusCode":"","x":790,"y":920,"wires":[]},{"id":"3d20f750.413ac8","type":"function","z":"2c9dd332.05334c","name":"transform","func":"\nlet factories = global.get(\"factories\"); \nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nmsg.payload = error && error.code === 11000 ? \nfactories.messages.address.existAddress :\nfactories.messages.generic.fail;\n   \nreturn msg;","outputs":1,"noerr":0,"x":400,"y":940,"wires":[["27c64d64.24efd2"]]},{"id":"27c64d64.24efd2","type":"switch","z":"2c9dd332.05334c","name":"","property":"amqpMessage","propertyType":"msg","rules":[{"t":"null"},{"t":"nnull"}],"checkall":"true","outputs":2,"x":570,"y":940,"wires":[["e69266cd.e2b688","b1950336.2e42f"],["1dbd7f6c.ccca81","4b0ebfc3.c5f5f"]]},{"id":"1dbd7f6c.ccca81","type":"async-function","z":"2c9dd332.05334c","name":"","func":"if(msg.error.message.includes('CONNECTION_ERROR')){\n    await Promise.delay(5000);\n    await msg.amqpMessage.nackMsg();\n}else{\n    await msg.amqpMessage.ackMsg();\n}\n    \nmsg.payload = typeof msg.error.message;    \n    \nreturn msg;","outputs":1,"noerr":6,"x":790,"y":980,"wires":[[]]},{"id":"4b0ebfc3.c5f5f","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"console":"false","complete":"error","x":799.0729522705078,"y":1025.895881652832,"wires":[]},{"id":"b1950336.2e42f","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"console":"false","complete":"false","x":740,"y":839,"wires":[]},{"id":"aa73f075.59b5f","type":"amqp in","z":"2c9dd332.05334c","name":"remove addr","topic":"${config.rabbit.serviceName}.account.delete","iotype":"3","ioname":"events","noack":"0","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":88.19097137451172,"y":616.3229627609253,"wires":[["f8fd8fe7.b361c"]]},{"id":"f8fd8fe7.b361c","type":"function","z":"2c9dd332.05334c","name":"parse","func":"\nmsg.payload = JSON.parse(msg.payload);\nmsg.address = msg.payload.address;\nreturn msg;","outputs":1,"noerr":0,"x":251.0173568725586,"y":617.5660305023193,"wires":[["316484c0.63001c"]]},{"id":"d8f7fe8a.d1b61","type":"switch","z":"2c9dd332.05334c","name":"","property":"amqpMessage","propertyType":"msg","rules":[{"t":"null"},{"t":"nnull"}],"checkall":"true","outputs":2,"x":753.6840133666992,"y":550.6770706176758,"wires":[["cdd0bdcd.24b59"],["dd1d132c.4a4f7"]]},{"id":"dd1d132c.4a4f7","type":"function","z":"2c9dd332.05334c","name":"","func":"\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;","outputs":1,"noerr":0,"x":932.6840209960938,"y":589.7882080078125,"wires":[["47043366.c3b4fc"]]},{"id":"47043366.c3b4fc","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}.account.deleted","iotype":"3","ioname":"events","server":"","servermode":"1","x":1072.6840209960938,"y":589.7882080078125,"wires":[]},{"id":"2d0c2014.909c4","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}_user.created","iotype":"3","ioname":"internal","server":"","servermode":"1","x":923.3506546020508,"y":448.34375762939453,"wires":[]},{"id":"1097d605.d7a2ea","type":"function","z":"2c9dd332.05334c","name":"","func":"\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;","outputs":1,"noerr":0,"x":757.3507347106934,"y":453.34375953674316,"wires":[["2d0c2014.909c4"]]},{"id":"97ae203e.df01a","type":"function","z":"2c9dd332.05334c","name":"","func":"const _ = global.get('_');\n \nlet account = msg.payload[0];\nlet confirmedBalance = _.get(account, 'balance.confirmed', 0);\nlet unconfirmedBalance = _.get(account, 'balance.unconfirmed', 0);\nlet vestedBalance = _.get(account, 'balance.vested', 0);\n\n\n\nlet balance = {\n    confirmed: {\n      value: confirmedBalance,\n      amount: `${(confirmedBalance/1000000).toFixed(6)}`\n    },\n    unconfirmed: {\n      value: unconfirmedBalance,\n      amount: `${(unconfirmedBalance/1000000).toFixed(6)}`\n    },\n    vested: {\n      value: vestedBalance,\n      amount: `${(vestedBalance/1000000).toFixed(6)}`\n    }\n}\n\nlet mosaics = _.chain(account.mosaics)\n    .toPairs()\n    .map(pair => {\n      let name = pair[0];\n      let data = pair[1];\n\n      data = {\n        confirmed: {\n          amount: data.confirmed / Math.pow(10, data.decimals),\n          value: data.confirmed\n        },\n        unconfirmed: {\n          amount: data.unconfirmed / Math.pow(10, data.decimals),\n          value: data.unconfirmed\n        },\n        decimals: data.decimals\n      };\n\n      return [name, data];\n    })\n    .fromPairs()\n    .value();\n\nmsg.payload = {balance, mosaics};\n\nreturn msg;\n","outputs":1,"noerr":0,"x":670,"y":720,"wires":[["6e227f25.b210e"]]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"2c9dd332.05334c","type":"flows"}, done);
};
