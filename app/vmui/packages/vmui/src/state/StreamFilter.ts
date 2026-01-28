export let selectedStream = "";
export let streamReady = false;

export const setSelectedStreamGlobal = (v: string) => {
  selectedStream = v;
  streamReady = true;   
};
