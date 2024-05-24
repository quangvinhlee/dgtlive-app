import { Round } from 'library/src/model/tournament';
import { BiSolidChess } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import React, { useMemo, useState } from 'react';
import { IoChevronUpCircleOutline } from "react-icons/io5";
import { MdOutlineExpandCircleDown } from "react-icons/md";

interface ScheduleProps {
  data: Round[]
  onSelect: (round: number, gameId: number) => void
}

const Schedule = ({ data, onSelect }: ScheduleProps) => {
  const [openRoundIndex, setOpenRoundIndex] = useState<number | null>(null);

  const sortedData = useMemo<Round[]>(() => {
    return [...data].reverse().map((x, index) => ({
      ...x, index: data.length - index
    }));
  }, [data]);

  const toggleRound = (index: number) => {
    if (openRoundIndex === index) {
      setOpenRoundIndex(null);
    } else {
      setOpenRoundIndex(index);
    }
  };

  return (
    <div className="max-h-screen overflow-y-auto pb-16">
      <h1 className="text-2xl font-bold mb-4 pl-2">Schedules</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {sortedData.map((item, index) => (
          <div key={index} className={"bg-gray-100 p-2 relative" + (item.live ? ' border border-green-500 bg-green-200' : '') + ' ' + (item.pairs.length === 0 ? 'opacity-35' : '')}>
            <h2 className="text-xl font-bold mb-2 cursor-pointer">R{item.index || 0 + 1} - {item.date}</h2>
            {!item.live && openRoundIndex !== index &&
              <MdOutlineExpandCircleDown className='absolute top-2 right-2 cursor-pointer text-xl text-green-700' onClick={() => toggleRound(index)} />
            }
            {!item.live && openRoundIndex === index &&
              <IoChevronUpCircleOutline className='absolute top-2 right-2 cursor-pointer text-xl text-red-500' onClick={() => toggleRound(index)} />
            }

            {item.live && <CiStreamOn className='absolute top-0 right-0 text-green-600' />}
            {openRoundIndex === index && item.pairs.length > 0 && !item.live && (
              <ul>
                {item.pairs.map((pair, pairIndex) => (
                  <li key={pairIndex} className="mb-2 cursor-pointer hover:bg-slate-400">
                    <div className="flex justify-between items-center" onClick={() => onSelect(index + 1, pairIndex + 1)}>
                      <div>
                        {pair.black} {' '}
                        vs
                        {' '}
                        {pair.white} - {pair.result}
                      </div>
                      <div>
                        <BiSolidChess />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {openRoundIndex === index && item.pairs.length === 0 && (
              <p>No pairs scheduled</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
