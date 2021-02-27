// @flow

/**
 * HTTPサーバが機動するポート、名前付きパイプを取得する
 *
 * @return 取得結果
 */
export function getServerPort(): number | string {
  return getPortFromEnv() ?? getNamedPipeFromEnv() ?? 3000;
}

/**
 * 環境変数からポート番号を取得する
 * 正しいポート番号を取得できない場合はnullを返す
 *
 * @return 取得結果
 */
export function getPortFromEnv(): number | null {
  const port = parseInt(process.env.PORT, 10);
  const isValidPort = !isNaN(port) && (0 <= port);
  return isValidPort ? port : null;
}

/**
 * 環境変数から名前付きパイプを取得する
 * 正しい名前付きパイプを取得できない場合はnullを返す
 *
 * @return 取得結果
 */
export function getNamedPipeFromEnv(): string | null {
  const namedPipe: string = process.env.PORT ?? '';
  const isValidNamedPipe = namedPipe !== '';
  return isValidNamedPipe ? namedPipe : null;
}