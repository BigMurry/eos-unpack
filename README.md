# eos-unpack
unpack eos packed data

# how to use
```javascript
const unpackTx = require('eos-unpack');
const rawTx = '6AB1C55F9266129C3D9C000000000100A6823403EA3055000000572D3CCDCD01408608D91D7F305500000000A8ED32322A408608D91D7F305580A98A48A169A63B40787D010000000004454F53000000000931303532323836343000';

const unpacked = unpackTx(rawTx);

console.log(JSON.stringify(unpacked, null, 2));
/*
{
  "expiration": "2020-12-01T02:58:50.000",
  "ref_block_num": 26258,
  "ref_block_prefix": 2621283346,
  "max_net_usage_words": 0,
  "max_cpu_usage_ms": 0,
  "delay_sec": 0,
  "context_free_actions": [],
  "actions": [

    {
      "account": "eosio.token",
      "name": "transfer",
      "authorization": [
        {
          "actor": "eosbybit1234",
          "permission": "active"
        }
      ],
      "data": {
        "from": "eosbybit1234",
        "to": "binancecleos",
        "quantity": "2500.0000 EOS",
        "memo": "105228640"
      }
    }
  ],
  "transaction_extensions": [],
  "hash": "2d9eafd3d15d6d0276922d1a4633feb58bd1227cabae509350bf79e75749b529"
}
*/
```
