import { sha512 } from "js-sha512";

export default async function handler(req, res) {
  const txnid= Math.floor(Math.random()*100001);;
  try {
    const { amount, firstname, email, phone } = req.body;
    var hash=sha512(`${process.env.MERCHANT_ID}|${txnid}|${amount}|iPhone|${firstname}|${email}|||||||||||${process.env.SALT_KEY}`)

    console.log(hash)
    res.status(200).send({
      hash : hash,
      txnid : txnid,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
