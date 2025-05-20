"use client";

import { useWriteContract, useReadContract } from "wagmi";

export default function Home() {
  
  const wagmiContractConfig = {
    address: "0x9A42354F90d888738B40442e3EF2b8c628ef5ef2",
    abi: [
      {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getDoubledNumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "number",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
  };

  const { writeContract } = useWriteContract();
  const {data: counter, isError, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getDoubledNumber"

  });
  const handleIncrement = async () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "increment"
    });
  };
const handleGetIncrement = async () => {
   try{
    await refetch();
    console.log(`counter: ${(counter as any).toString()}`);
   }catch(error){
    console.error(error)
   }
  };

  return (
    <>
      <div className="p-4 m-41">
        <w3m-button />
        <w3m-network-button />
      </div>
      <div>
        <button
          className="cursor-pointer p-4 m-4 font-semibold rounded-lg bg-blue-500"
          onClick={handleGetIncrement}
        >
          Get Dubled Counter : {counter ? counter.toString(): "Loading ..."}
        </button>
        <button
          className="cursor-pointer p-4 m-4 font-semibold rounded-lg bg-green-500"
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
    </>
  );
}
