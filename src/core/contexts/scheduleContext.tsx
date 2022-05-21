import React, { createContext, useEffect, useState } from "react";

import { Props, scheduleManager } from "~/core";
import { Setup } from "~/core/schedule";

type ScheduleContextProps = Partial<{
  room: number;
  day: number;
  month: number;
  year: number;
  hoursSelected: string[];
  setHoursSelected: any;
  getSetup: Setup;
  getUser: number;
  setUser: any;
  getRoomSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  getDaySelectOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getHoursFreeSelected: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>;

export const ScheduleContext = createContext<ScheduleContextProps>({});

const ScheduleProvider: React.FC<Props> = ({ children }) => {
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [room, setRoom] = useState<number>(1);
  const [hoursSelected, setHoursSelected] = useState<string[]>([]);
  const [getSetup, setSetup] = useState<Setup>();
  const [getUser, setUser] = useState(0);

  const _result: ScheduleContextProps = {
    day,
    room,
    month,
    year,
    hoursSelected,
    setHoursSelected,
    getSetup,
    getUser,
    setUser,
    getHoursFreeSelected: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const _buttonSelected = e.currentTarget.value;

      if (hoursSelected.indexOf(_buttonSelected) === -1) {
        setHoursSelected((list) => [...list, _buttonSelected]);
      } else {
        setHoursSelected(
          hoursSelected.filter((item) => item !== _buttonSelected)
        );
      }
    },
    getRoomSelectOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRoom(parseInt(e.target.value));
    },

    getDaySelectOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value: string = e.target.value;
      setYear(parseInt(value.slice(0, 4)));
      setMonth(parseInt(value.slice(5, 7)));
      setDay(parseInt(value.slice(8)));
    },
  };

  useEffect(() => {
    async function getRoomsNames() {
      const _setup = await scheduleManager.getSetup();
      setSetup(_setup);
    }
    getRoomsNames();
  }, []);

  return (
    <ScheduleContext.Provider value={_result}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;