# Doge Protocol Desktop Wallet
Doge Protocol Desktop Wallet for Windows and Mac is built using Electron. 

### Warning
This is a prototype, not yet ready for production use. Do not use in production systems!

## Building

1) Install npm. For details see https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2) Install Electron. For details see https://www.electronjs.org/docs/latest/tutorial/installation
   
		npm install electron --save-dev

4) Create the package:

		npm run publish

### Hybrid PQC
The Web Assembly files found under the wasm folder can be generated following the instructions in https://github.com/DogeProtocol/hybrid-pqc

### Known Issues
1) The file src\assets\icons\app\icon.icns required for Mac is not checked in. It needs to be created for Mac installation.
2) This is a prototype, code is messy. It is no ready for production use.   

## License
This repository currently uses a commercial theme that is not included in the license. Other parts of the repository excluding the commercial theme are available under MIT license.
