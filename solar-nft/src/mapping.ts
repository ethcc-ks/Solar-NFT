import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  NFTadded as NFTaddedEvent,
  NewPlanet as NewPlanetEvent,
  Transfer as TransferEvent,
  slotAdded as slotAddedEvent
} from "../generated/PlanetReact/PlanetReact"
import {
  Approval,
  ApprovalForAll,
  NFTadded,
  NewPlanet,
  Transfer,
  slotAdded
} from "../generated/schema"


export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleNFTadded(event: NFTaddedEvent): void {
  let entity = new NFTadded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.save()
}

export function handleNewPlanet(event: NewPlanetEvent): void {
  let entity = new NewPlanet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.id = event.params.id
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleslotAdded(event: slotAddedEvent): void {
  let entity = new slotAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.save()
}
