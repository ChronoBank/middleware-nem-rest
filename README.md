# middleware-nem-rest [![Build Status](https://travis-ci.org/ChronoBank/middleware-nem-rest.svg?branch=master)](https://travis-ci.org/ChronoBank/middleware-nem-rest)

Middleware service for which expose rest api

### Installation
 
This module is a part of middleware services. You can install it in 2 ways:

1) through core middleware installer  [middleware installer](https://www.npmjs.com/package/chronobank-middleware)
2) by hands: just clone the repo, do 'npm install', set your .env - and you are ready to go

#### About
This module is used for interaction with middleware. This happens through the layer, which is built on node-red.
So, you don't need to write any code - you can create your own flow with UI tool supplied by node-red itself. Access by this route:
```
/admin
````

#### Predefined Routes with node-red flows

| description | route | method | params | output | 
| --------- | ---- | - | ---- | --- | 
| get transactions for the registered address (by default skip = 0, limit=100) | /tx/:addr/history   | GET | ``` {addr: <string>, limit: <Number>, skip: <Number> ```  |```[<Object of tx>]```  [view example](examples/history.md)  
| get balance of the registered address| /addr/:addr/balance  | GET | ``` {addr: <string>} ``` | ``` {balance: <Number>, assets: {assetId: <Number>}} ```  [view example](examples/balance.md) 
| get tx by its hash | /tx/{hash}   | GET | ``` {hash: <string>} ``` | ```<Object of tx>```  [view example](examples/tx.md) 
| register new address on middleware. assets - is an array of assets, which balance changes this address will listen to (optional). | /addr   | POST | ``` {address: <string>} ``` | ``` {code: <Number>, message: <string>} ```  <italic>Example:</italic> ```{code: 1, message: 'ok'} ``` 
| mark an address as inactive and stop perform any actions for this address. | /addr | DELETE | ``` {address: <string>} ``` | ``` {code: <Number>, message: <string>} ```  <italic>Example:</italic> ```{code: 1, message: 'ok'} ``` 
| broadcast raw transaction |  /tx/send   | POST | ``` {data: <Object of tx>, signature: <String>} ``` [view example](examples/tx_send.md) |  [view example](examples/tx.md) 
`


The available routes are listed below:

| route | method | params | description |
| ------ | ------ | ------ | ------ |
| /addr   | POST | ``` {address: <string>, erc20tokens: [<string>], nem: [<string>]} ``` | register new address on middleware. erc20tokens - is an array of erc20Tokens, which balance changes this address will listen to (optional), nem - is nem's address (optional).
| /addr   | DELETE | ``` {address: <string>} ``` | mark an address as inactive and stop perform any actions for this address.
| /addr/{address}/balance   | GET |  | retrieve balance of the registered address
| /tx   | POST | ``` {tx: <string>} ``` | broadcast raw transaction
| /tx/{hash}   | GET | | return tx by its hash
| /tx/{address}/history  | GET |  | retrieve transactions for the regsitered address [may set limit and skip parameters].

#### Output of endpoints

/addr/{address}/balance:

```
{
"balance": {
  "confirmed": {
    "value":"110818180900","amount":"110818.180900"
   },
   "unconfirmed":{
     "value":"110818180900","amount":"110818.180900"
   },
   "vested":{
     "value":"110241162911","amount":"110241.162911"
   }
 },
 "mosaics":{
   "nem:xem":{
     "confirmed":{
       "amount":11081818090,"value":110818180900
     },
     "unconfirmed":{
       "amount":11081818090,"value":110818180900
     }
   },
   "prx:xpx":{
     "confirmed":{
       "amount":999798.967,"value":9997989670
      },
      "unconfirmed":{
        "amount":999798.967,"value":9997989670
      }
   }
 }
}
````

#### REST guery language

Every collection could be fetched with an additional query. The api use [query-to-mongo](https://www.npmjs.com/package/query-to-mongo) plugin as a backbone layer between GET request queries and mongo's. For instance, if we want to fetch all recods from collection 'issue', where issueNumber < 20, then we will make a call like that:
```
curl http://localhost:8080/events/issue?issueNumber<20
```


##### сonfigure your .env

To apply your configuration, create a .env file in root folder of repo (in case it's not present already).
Below is the expamle configuration:

```
MONGO_ACCOUNTS_URI=mongodb://localhost:27017/data
MONGO_ACCOUNTS_COLLECTION_PREFIX=nem

MONGO_DATA_URI=mongodb://localhost:27017/data
MONGO_DATA_COLLECTION_PREFIX=nem

NODERED_MONGO_URI=mongodb://localhost:27018/data
NODE_RED_MONGO_COLLECTION_PREFIX=rest

REST_PORT=8081
NETWORK=development
NIS=http://192.3.61.243:7890
NODERED_AUTO_SYNC_MIGRATIONS=true
```

The options are presented below:

| name | description|
| ------ | ------ |
| MONGO_URI   | the URI string for mongo connection
| MONGO_COLLECTION_PREFIX   | the default prefix for all mongo collections. The default value is 'nem'
| MONGO_ACCOUNTS_URI   | the URI string for mongo connection, which holds users accounts (if not specified, then default MONGO_URI connection will be used)
| MONGO_ACCOUNTS_COLLECTION_PREFIX   | the collection prefix for accounts collection in mongo (If not specified, then the default MONGO_COLLECTION_PREFIX will be used)
| MONGO_PROFILE_URI   | the URI string for mongo connection, which holds profile accounts (if not specified, then default MONGO_URI connection will be used) [for token from laborx]
| MONGO_PROFILE_COLLECTION_PREFIX   | the collection prefix for profile collection in mongo (If not specified, then the default MONGO_COLLECTION_PREFIX will be used) [for token from laborx]
| MONGO_DATA_URI   | the URI string for mongo connection, which holds data collections (for instance, processed block's height). In case, it's not specified, then default MONGO_URI connection will be used)
| MONGO_DATA_COLLECTION_PREFIX   | the collection prefix for data collections in mongo (If not specified, then the default MONGO_COLLECTION_PREFIX will be used)
| NODERED_MONGO_URI   | the URI string for mongo connection, which holds data collections (for instance, processed block's height). In case, it's not specified, then default MONGO_URI connection will be used)
| NODE_RED_MONGO_COLLECTION_PREFIX   | the collection prefix for node-red collections in mongo (If not specified, then the collections will be created without prefix)
| REST_PORT   | rest plugin port
| NETWORK   | network name (alias)- is used for connecting via node rest api (see block processor section)
| NIS   | node rest api path address 
| WEBSOCKET_NIS   | node websocket api path address 
| NODERED_MONGO_URI   | the URI string for mongo collection for keeping node-red users and flows (optional, if omitted - then default MONGO_URI will be used)
| HTTP_ADMIN | admin path for nodered or false (if not publish as default)
| LABORX | url for laborxAuth [default=http://localhost:3001/api/v1/security]
| LABORX_RABBIT_SERVICE_NAME | service name for laborx[exchange=events] in rabbitMq 
| LABORX_RABBIT_URI | rabbit uri for laborx [exchange=events]
| LABORX_USE_AUTH | use laborx auth or not (default=true)
| LABORX_USE_CACHE | use laborx auth cache in mongo or not (default=true)
| SYSTEM_RABBIT_URI   | rabbitmq URI connection string for infrastructure
| SYSTEM_RABBIT_SERVICE_NAME   | rabbitmq service name for infrastructure
| SYSTEM_RABBIT_EXCHANGE   | rabbitmq exchange name for infrastructure
| CHECK_SYSTEM | check infrastructure or not (default = true)

### format balance for accounts
```
balance:
  confirmed:
    value: '0'
    amount: '0.0000'
  unconfirmed:
    value: '0'
    amount: 0.0000'
  vested:
    value: '0
    amount: '0.0000'
mosaics:
  nem:xem:
    confirmed:
      value: '0'
      amount: '0.0000'
    unconfirmed:
      value: '0'
      amount: 0.0000'
    vested:
      value: '0
      amount: '0.0000'
```

#### for tests

set keys for account nem in testnet with balances > 0
To apply your configuration, create a .env file in root folder of repo (in case it's not present already).
Below is the expamle configuration:

```
NIS=http://192.3.61.243:7890
ADDRESS_ONE=TB353453453453
ADDRESS_TWO=TDY535453453453
```


License
----
 [GNU AGPLv3](LICENSE)

Copyright
----
LaborX PTY
