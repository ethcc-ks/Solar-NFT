import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

class Service {
    constructor() {
        this.state = {
            pinata_api_key: '9abc6e0558f2d596f696',
            pinata_secret_api_key: 'af50e53805c94dfa4b6bd3ddb85eadb5898704a5c17577b5651cf968e441cdec'
        }    
    }


    getXYPosition = (planet) => {
        return {
        positionX: planet.radius * Math.cos(planet.angle),
        positionZ: planet.radius * Math.sin(planet.angle)
        }
    }

    getRandomLogInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return 100 * Math.log(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    async fetchNFT(contractAddress, tokenID) {
        const req = await axios.get(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenID}`)
        .then(function (response) {
            return response
        })
        return { contract: req.data.asset_contract.address, image: req.data.asset_contract.image_url, name: req.data.name, owner: req.data.owner.address, tokenID: req.data.token_id };
    }

    async getNFTMetadata (tokenURI) {
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${tokenURI}`)
        const json = await response.json();
        return json;
    }

    pinFileToIPFS = (file) => {

        //we gather a local file for this example, but any valid readStream source will work here.
        let data = new FormData();
        data.append('file', file);

        //pinataOptions are optional
        const pinataOptions = JSON.stringify({
            cidVersion: 0,
            customPinPolicy: {
                regions: [
                    {
                        id: 'FRA1',
                        desiredReplicationCount: 1
                    },
                    {
                        id: 'NYC1',
                        desiredReplicationCount: 2
                    }
                ]
            }
        });
        data.append('pinataOptions', pinataOptions);

        return axios
            .post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
                maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: this.state.pinata_api_key,
                    pinata_secret_api_key: this.state.pinata_secret_api_key
                }
            })
            .then((response) => {
                console.log(response.data.IpfsHash)
                return response.data.IpfsHash;
            })
            .catch((error) => {
                console.log(error)
            });
    };

    pinJSONToIPFS = async (name, imageURL, description) => {
        const JSONBody = {
            pinataMetadata: {
                name: name,
            },
            pinataContent: {
                name: name,
                description: description,
                image: `https://gateway.pinata.cloud/ipfs/${imageURL}`,
                attributes: [
                    {
                        "display_type": 'number',
                        "trait_type": 'NFT Slots',
                        "value": 0,
                        "max_value": 5
                    }
                ]
            }
        
        }

        return axios
            .post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, JSONBody, {
                headers: {
                    pinata_api_key: this.state.pinata_api_key,
                    pinata_secret_api_key: this.state.pinata_secret_api_key
                }
            })
            .then((response) => {
                return response.data.IpfsHash;
            })
            .catch((error) => {
                console.log(error)
            });
    };

    changeMetadataForHash = (slotsUsed, hash, contract, tokenID) => {
        const url = `https://api.pinata.cloud/pinning/hashMetadata`;
        const body = {
            ipfsPinHash: hash,
            attributes: [
                {
                    "display_type": 'number',
                    "trait_type": 'NFT Slots',
                    "value": slotsUsed + 1,
                    "max_value": 5
                },
                {
                    "trait_type": `NFT ${slotsUsed + 1}`,
                    "value": `${contract}/${tokenID}`,
                }
            ]
        };
        return axios
            .put(url, body, {
                headers: {
                    pinata_api_key: this.state.pinata_api_key,
                    pinata_secret_api_key: this.state.pinata_secret_api_key
                }
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    queryPlanetsFromGraph = () => {
        const planetRequest = `
              query {
                planets {
                  id
                  tokenURI
                }
              }
              `
        const client = new ApolloClient({
          uri: 'https://api.studio.thegraph.com/query/5410/planeth/v0.0.13',
          cache: new InMemoryCache()
        });
    
        const result = client.query({
          query: gql(planetRequest)
        })
          .then(data => {
            return data;
          })
          .catch(err => { console.log("Error fetching data: ", err) });
        return result;
    }

    queryNftsFromGraph = () => {
        const nftRequest = `
              query {
                nftinplanets {
                  planetid
                  owner
                  nftaddress
                  nftid
                }
              }
              `
        const client = new ApolloClient({
          uri: 'https://api.studio.thegraph.com/query/5410/planeth/v0.0.13',
          cache: new InMemoryCache()
        });
    
        let receivedData;
        client.query({
          query: gql(nftRequest)
        })
          .then(data => {
            console.log("Subgraph data: ", data)
            receivedData = data;
          })
          .catch(err => { console.log("Error fetching data: ", err) });
        return receivedData;
      }

}

export default Service;
