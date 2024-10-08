import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Button, Card, Modal, Typography } from "~/components/common";

type ClaimSuccessModalProps = {
  onClose: () => void;
  hash: string;
  data: { pendingUsdcReward: string };
} & ModalRootProps;

const ClaimSuccessModal = (props: ClaimSuccessModalProps) => {
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <Modal title="SUCCESS" onClose={props.onClose} opened={props.opened}>
     <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center gap-7'>
        <Image src="/img/icons/success.svg" width={80} height={80} alt='' />
        <Typography size='md' secondary className='text-center'>
            SUCCESSFULLY CLAIMED FEES
        </Typography>
        <div className='flex items-center justify-between w-full gap-2'>
          <div className="flex items-center gap-1">
            <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1">
              MEMES: 1%
            </Typography>
          </div>

          <div className="flex items-center gap-1">
              <Image src="/img/icons/Infinity.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                INFINITY
              </Typography>
            </div>
        </div>
        <div className="flex flex-col items-center gap-3">
        <Typography size="sm" secondary>
          CLAIMED FEES
        </Typography>
        <Typography size="lg" className="font-bold">
          {
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 6,
            }).format(Number(props.data.pendingUsdcReward))
          }
        </Typography>
        <div className="flex items-center gap-2 mb-3">
          <Typography size="xs">
            {props.data.pendingUsdcReward} USDC 
          </Typography>
          <Image src="/img/tokens/usdc.png" alt="" height={30} width={30} />
        </div>
        {/* <Typography size="sm" secondary className="mt-5">
        CLAIMED CHAOS
        </Typography>
        <Typography size="lg" className="font-bold">
          $2,34
        </Typography>
        <div className="flex items-center gap-2">
          <Typography size="xs">1020,02 CHAOS</Typography>
          <Image src="/img/icons/chaos.svg" alt="" height={30} width={30} />
        </div> */}
      </div>
      {/* <Typography className='flex justify-end w-full mb-3' size='xs'>Total fee cost: $ 0.10</Typography> */}
    </div>
        <div className='flex flex-col gap-4 w-full'>
        <Button onClick={props.onClose} className="w-full">
          <Typography secondary size="xs" fw={700} tt="uppercase">
           COMPLETED
          </Typography>
        </Button>
        <button className="w-full md:w-auto custom_btn" onClick={handleDetails}>
          <Typography secondary size="xs" fw={700} tt="uppercase">
           VIEW DETAILS
          </Typography>
        </button>
        </div>
    </div>
    </Modal>
  );
};

export default ClaimSuccessModal;
