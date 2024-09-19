import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD } from "./dummy";
import PoolDetail from "./PoolDetail";
import { useWewePools } from "~/hooks/usePool";

type LiquidityProps = {
  setPoolTypes: (number: number) => void;
  poolTypes: number;
  onNext: () => void;
  onDeposit: () => void;
};

const Liquidity = ({
  setPoolTypes,
  poolTypes,
  onNext,
  onDeposit,
}: LiquidityProps) => {
  const [poolDetail, setPoolDetail] = useState();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (value: any) => {
    console.log(showDetails);
    setPoolDetail(value);
    console.log(value);
  };

  useEffect(() => {
    if (poolDetail !== undefined) {
      setShowDetails(true);
    }
  }, [poolDetail]);

  const handleHideDetails = () => {
    setShowDetails(false);
    setPoolDetail(undefined);
  };

  const handleZapIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeposit();
  };

  const { data: pools } = useWewePools();

  return (
    <>
      {!showDetails ? (
        <Card className="overflow-x-scroll">
          <div className="flex items-center justify-between w-full gap-6 md:flex-row flex-col">
            <div className="bg_light_dark sm:w-[30rem] w-full flex items-center justify-between gap-3 h-[3rem]">
              <div
                onClick={() => setPoolTypes(0)}
                className={`${poolTypes === 0 && "nav_selected"} nav`}
              >
                <Typography size="sm">Liquidity</Typography>
              </div>
              <div
                onClick={() => setPoolTypes(1)}
                className={`${poolTypes === 1 && "nav_selected"} nav`}
              >
                <Typography size="sm">My Shares</Typography>
              </div>
            </div>
          </div>
          <table className="w-[fit-content] min-w-[100%] table-auto text-left bg_dark mt-5">
            <thead>
              <tr>
                {DUMMY_TABLE_HEAD.map((head) => (
                  <th key={head} className="bg-blue-gray-50 p-4">
                    <Typography size="sm" className="leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <Typography className="px-4 text-sm py-2">MEMES 1%</Typography>
            <tbody>
              {pools?.wewePools.map(
                ({ poolType, logo, type, pool, tvl, range, volume, apr }) => (
                  <>
                    <tr
                      onClick={() =>
                        handleShowDetails({
                          poolType,
                          logo,
                          type,
                          pool,
                          tvl,
                          volume,
                          apr,
                        })
                      }
                      key={pool}
                      className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]"
                      style={{ borderBottom: "1rem solid black" }}
                    >
                      <td className="p-4 font-bold ">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Image
                              className="min-w-6 min-h-6"
                              src={logo.first}
                              alt=""
                              width={32}
                              height={32}
                            />
                            <Image
                              className="ml-[-10px] min-w-6 min-h-6"
                              src={logo.second}
                              alt=""
                              width={32}
                              height={32}
                            />
                          </div>
                          <Typography size="xs" opacity={0.7}>
                            {type}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography size="xs" opacity={0.7}>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }).format(Number(tvl))}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography size="xs" opacity={0.7}>
                          {range}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography size="xs" opacity={0.7}>
                          {volume}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography size="xs" opacity={0.7}>
                          {apr}
                        </Typography>
                      </td>
                      <td className="p-4" align="right">
                        <Button
                          onClick={handleZapIn}
                          className="w-full md:w-auto min-w-[6rem]"
                        >
                          <Typography
                            secondary
                            size="xs"
                            fw="700"
                            tt="uppercase"
                          >
                            Deposit
                          </Typography>
                        </Button>
                      </td>
                    </tr>
                  </>
                )
              )}
            </tbody>
          </table>
        </Card>
      ) : (
        <PoolDetail onBack={handleHideDetails} onZap={onDeposit} />
      )}
    </>
  );
};

export default Liquidity;
