import * as fs from 'fs/promises';
import * as path from 'path';

const generateProxyFileContent = (proxyPort: number) => `
<script>
	(async () => {
		try {
			console.info("[Bootstrap] Loading development WebUI...");
			await fetch("http://localhost:${proxyPort}", {
				mode: "no-cors",
				method: "HEAD"
			});
			console.info("[Bootstrap] Development WebUI is online!");
			window.location.href = "http://localhost:${proxyPort}";
		} catch(err) {
			console.error("[Bootstrap] Development WebUI is not online!", err);
			const div = document.createElement('h1');
			div.style.margin = 0;
			div.style.display = "flex";
			div.style.justifyContent = "center";
			div.style.alignItems = "center";
			div.style.height = "100%";
			div.innerHTML = "Failed to load development WebUI, reason: UI_OFFLINE"
			document.body.appendChild(div);
		}
	})();
</script>
`;

export async function generateProxyFiles(proxyPort: number) {
  const content = generateProxyFileContent(proxyPort);

  const fileDir = path.resolve(__dirname, '..', '..', 'proxy');
  const filePath = path.resolve(fileDir, 'index.html');

  await fs.mkdir(fileDir, { recursive: true });
  await fs.writeFile(filePath, content);

  return fileDir;
}
