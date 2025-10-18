(async function () {
  const statusEl = document.getElementById('status');
  const countEl1 = document.getElementById('count1');
  const countEl2 = document.getElementById('count2');
  const addrEl1 = document.getElementById('addr1');
  const addrEl2 = document.getElementById('addr2');
  const incBtn1 = document.getElementById('inc1');
  const incBtn2 = document.getElementById('inc2');
  const syncAllBtn = document.getElementById('sync-all');
  const syncPartialBtn = document.getElementById('sync-partial');
  function setStatus(s) { statusEl.textContent = s; }

  setStatus('Loading WebAssembly...');

  let wasm1;
  let wasm2;
  try {
    const resp = await fetch('wasm_counter.wasm');
    if (!resp.ok) throw new Error('failed to fetch wasm: ' + resp.status);
    const bytes = await resp.arrayBuffer();
    const obj = await WebAssembly.instantiate(bytes, {});
    wasm1 = obj.instance.exports;

    const obj2 = await WebAssembly.instantiate(bytes, {});
    wasm2 = obj2.instance.exports;
} catch (err) {
    setStatus('Wasm load failed: ' + err.message);
    console.error(err);
    return;
  }

  setStatus('Wasm loaded');

  function update() {
    try {
      const val = wasm1.get();
      countEl1.textContent = String(val);
      const val2 = wasm2.get();
      countEl2.textContent = String(val2);

      const ptr1 = wasm1.getPointer();
      addrEl1.textContent = '0x' + ptr1.toString(16);
      const ptr2 = wasm2.getPointer();
      addrEl2.textContent = '0x' + ptr2.toString(16);
    } catch (e) {
      console.error(e);
      countEl1.textContent = 'error';
      countEl2.textContent = 'error';
    }
  }

  incBtn1.addEventListener('click', () => {
    try {
      wasm1.increment();
      update();
    } catch (e) {
      console.error(e);
      setStatus('Call failed: ' + e.message);
    }
  });

  incBtn2.addEventListener('click', () => {
    try {
      wasm2.increment();
      update();
    } catch (e) {
      console.error(e);
      setStatus('Call failed: ' + e.message);
    }
  });

  syncPartialBtn.addEventListener('click', () => {
    try {
      const addr1 = wasm1.getPointer();
      const addr2 = wasm2.getPointer();
      const wasm1u32 = new Uint32Array(wasm1.memory.buffer);
      const wasm2u32 = new Uint32Array(wasm2.memory.buffer);
      console.log(wasm1u32[addr1 / 4], wasm2u32[addr2 / 4]);
      wasm2u32[addr1 / 4] = wasm1u32[addr2 / 4];
      update();
    } catch (e) {
      console.error(e);
      setStatus('Call failed: ' + e.message);
    }
  });
  
  syncAllBtn.addEventListener('click', () => {
    try {
        const wasm1u8 = new Uint8Array(wasm1.memory.buffer);
        const wasm2u8 = new Uint8Array(wasm2.memory.buffer);
        wasm2u8.set(wasm1u8);
        update();
    } catch (e) {
        console.error(e);
        setStatus('Call failed: ' + e.message);
    }
  });

  // initial read
  update();
})();
