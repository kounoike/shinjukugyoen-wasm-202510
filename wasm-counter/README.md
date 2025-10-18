# Wasm Counter Demo

簡単な Wasm カウンターのデモページを追加しました。

ファイル:
- `index.html` - デモの HTML
- `wasm-loader.js` - Wasm を読み込む最小の JavaScript
- `wasm_counter.wasm` - ビルドすると生成される Wasm モジュール（このリポジトリには含まれていません）

ビルド方法（Zig がインストールされている前提）:

```
cd wasm-counter
zig build -Dtarget=wasm32-freestanding -Drelease-safe
```

簡易スクリプトでビルド＆コピーする方法:

```
./build-wasm.sh
```

（成功すると `wasm_counter.wasm` がこのディレクトリにコピーされます）

上のコマンドが成功すると `zig-out/bin/wasm_counter.wasm` が生成されるはずです。
それをルート (`index.html` と同じディレクトリ) にコピーするか、簡易サーバーで `zig-out/bin` をルートとして配信してください。

簡単に動かす（HTTP サーバーを使う必要があります。ローカルファイルだと Wasm を fetch できません）:

```
# Python 3 の簡易サーバー
python3 -m http.server 8000

# その後ブラウザで http://localhost:8000/ を開く
```

注意:
- Wasm の関数が `i64` を返す場合、ブラウザ側で BigInt を使うビルド（`--experimental-wasm-bigint` など）や JS 側の型変換に注意が必要です。今回のサンプルは簡易的な扱いです。
