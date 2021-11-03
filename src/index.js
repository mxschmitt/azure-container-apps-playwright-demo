const express = require('express')
const playwright = require('playwright')

const app = express()
app.use(express.static('./public'))
const port = process.env.PORT || 80;

app.get('/browser/:name', async (req, res) => {
  const browserName = req.params['name'] || 'chromium'
  if (!['chromium', 'firefox', 'webkit'].includes(browserName)) {
    return res.status(500).send(`invalid browser name (${browserName})!`)
  }
  const url = req.query.url || 'https://microsoft.com'
  const waitUntil = req.query.waitUntil || 'load'
  const width = req.query.width ? parseInt(req.query.width, 10) : 1920
  const height = req.query.height ? parseInt(req.query.height, 10) : 1080
  console.log(`Incoming request for browser '${browserName}' and URL '${url}'`)
  try {
    /** @type {import('playwright').Browser} */
    const browser = await playwright[browserName].launch({
      chromiumSandbox: false
    })
    const page = await browser.newPage({
      viewport: {
        width,
        height
      }
    })
    await page.goto(url, {
      timeout: 10 * 1000,
      waitUntil
    })
    if (req.query.timeout) {
      await page.waitForTimeout(parseInt(req.query.timeout, 10))
    }
    const data = await page.screenshot({
      type: 'png'
    })
    await browser.close()
    res.contentType('image/png')
    res.set('Content-Disposition', 'inline;');
    res.send(data)
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err}`)
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});