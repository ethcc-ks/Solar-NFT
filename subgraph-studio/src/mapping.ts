import { BigInt } from "@graphprotocol/graph-ts"
import {
  NFTadded as NFTaddedEvent,
  NewPlanet as NewPlanetEvent,
  Transfer as TransferEvent,
  slotAdded as slotAddedEvent
} from "../generated/PlanetReact/PlanetReact"
import { Planet,NFTInPlanet, Slot, Transfer  } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let token = Transfer.load(event.params.tokenId.toString());
  if (!token) {
    token = new Transfer(event.params.tokenId.toString());
    token.from = event.params.from.toHexString();
    token.to = event.params.to.toHexString();
    token.tokenId = event.params.tokenId.toString();
  }
  token.save();
}

export function handleNFTadded(event: NFTaddedEvent): void {
  let token = NFTInPlanet.load(event.params.planetId.toString());
  if (!token) {
    token = new NFTInPlanet(event.params.planetId.toString());

  }
  token.save();
}


export function handleNewPlanet(event: NewPlanetEvent): void {

  let planet = Planet.load(event.params.id.toString());
  if (!planet) {
    planet = new Planet(event.params.id.toString());
    planet.planetId = event.params.id.toString();
    planet.nbSlots = event.params.nbSlots.toString();
  }
  planet.save();
}



/*
export function handleslotAdded(event: slotAdded): void {}
*/
