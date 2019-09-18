export async function fetchJSON(url: string, data: any = {}, method: string = "POST"): Promise<any> {
  const {app} = require('./main');

  try {
      const res = await fetch(fullUrl(url), {
          method,
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body: data ? JSON.stringify(data) : undefined
      });

      let result = {} as any;

      try {
          result = await res.json();
          if (result.error) {
              await app.$refs.msgBox.ok(result.error);
          }
      } catch (e) {
          if (res.status === 401 || res.status === 403) {
              await app.$refs.msgBox.ok("Please login");
              location.href = fullUrl("/api/auth/login");
              return;
          } else if (res.status >= 300) {
              await app.$refs.msgBox.ok(res.statusText);
          }

          return { error: e };
      }

      return result;
  } catch (e) {
      await app.$refs.msgBox.ok(e.toString());
      return { error: e };
  }
}

export function fullUrl(url: string = "/"): string {
  try {
      const { remote } = (window as any).require("electron");
      return new URL(url, `http://localhost:${remote.process.env.PORT}`).href;
  } catch (e) {
      return url;
  }
}