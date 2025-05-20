"use client";

import { useWriteContract, useReadContract } from "wagmi";

export default function Home() {
  // Smart contract configuration: address and ABI
  const wagmiContractConfig = {
    address: "0x9A42354F90d888738B40442e3EF2b8c628ef5ef2",
    abi: [
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
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "number",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
  };

  // Hook to write to the contract (e.g., calling increment)
  const { writeContract } = useWriteContract();

  // Hook to read from the contract (e.g., getDoubledNumber)
  const {
    data: counter,     // Holds the returned value from getDoubledNumber
    isError,           // Indicates if there was an error during the read
    refetch            // Function to manually re-fetch the data
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getDoubledNumber"
  });

  // Handle increment button click (calls increment function on contract)
  const handleIncrement = async () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "increment"
    });
  };

  // Handle fetching the doubled number and logging it to the console
  const handleGetIncrement = async () => {
    try {
      await refetch(); // Refresh the counter value
      console.log(`counter: ${(counter as any).toString()}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* WalletConnect UI components */}
      <div className="p-4 m-41">
        <w3m-button />
        <w3m-network-button />
      </div>

      {/* Action buttons */}
      <div>
        <button
          className="cursor-pointer p-4 m-4 font-semibold rounded-lg bg-blue-500"
          onClick={handleGetIncrement}
        >
          Get Doubled Counter: {counter ? counter.toString() : "Loading ..."}
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
