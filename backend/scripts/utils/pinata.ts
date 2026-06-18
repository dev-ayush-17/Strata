import "dotenv/config"
import { PinataSDK } from "pinata"

const jwt = process.env.PINATA_JWT

if (!jwt) {
    throw new Error("PINATA_JWT is not set")
}

export const pinata = new PinataSDK({
    pinataJwt: jwt,
})