"use client";

import { useWriteContract } from "wagmi";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const abi = [
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getDoubledNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "number",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

export default function Home() {
  const { writeContractAsync } = useWriteContract();
  const { isConnected } = useAccount();

  const handleIncrement = async () => {
    if (!isConnected) {
      alert("Connect your wallet first.");
      return;
    }

    try {
      const txHash = await writeContractAsync({
        address: "0x9A42354F90d888738B40442e3EF2b8c628ef5ef2",
        abi,
        functionName: "increment",
      });

      console.log("Transaction sent:", txHash);
    } catch (error) {
      console.error("Error calling increment:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <w3m-button />
        <w3m-network-button />
      </div>
      <div>
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
