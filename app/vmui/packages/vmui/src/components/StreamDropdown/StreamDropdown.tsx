import { useEffect, useState } from "react";
import { setSelectedStreamGlobal } from "../../state/StreamFilter";
import "./style.scss";

type Stream = {
  name: string;
  hits: number;
};

type Props = {
  onSelect?: (value: string) => void; 
};

const StreamDropdown = ({ onSelect }: Props) => {
  const [selectedStream, setSelectedStream] = useState("");
  const [streams, setStreams] = useState<Stream[]>([]);

 useEffect(() => {
  const fetchStreams = async () => {
    try {
      const res = await fetch("/select/logsql/streams?query=*");
      const data = await res.json();

      const parsed = data.values.map((v: any) => ({
        name: v.value.match(/stream="([^"]+)"/)?.[1],
        hits: v.hits,
      }));

      setStreams(parsed);


      if (parsed.length > 0) {
        const first = parsed[0].name;
        setSelectedStream(first);
        setSelectedStreamGlobal(first);
      }

    } catch (err) {
      console.error("Failed to fetch streams:", err);
    }
  };

  fetchStreams();
}, []);


  return (
  <label className="stream-filter">
    <span className="stream-filter__label">Stream</span>

    <select
      className="stream-filter__select"
      value={selectedStream}
      onChange={(e) => {
        const value = (e.target as HTMLSelectElement).value;
        setSelectedStream(value);
        setSelectedStreamGlobal(value);
      }}
    >
      <option value="" disabled>
        Select stream
      </option>
      

      {streams.map((s) => (
        <option key={s.name} value={s.name}>
          {s.name}
        </option>
      ))}
     <option value="__all__">
        All streams (slow queries)
      </option>
    </select>
  </label>
);


};

export default StreamDropdown;
