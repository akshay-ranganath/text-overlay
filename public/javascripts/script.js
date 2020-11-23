var insertHandler = function (e) {
  const img = document.getElementById('img')
  window.publicId = e.assets[0].public_id
  img.src = 'https://res.cloudinary.com/mermaid/image/upload/f_auto,q_auto/' + e.assets[0].public_id
}

function updateText (updateImage) {
  let text = document.getElementById('message').value || 'test'
  const img = document.getElementById('img')

  const option = document.getElementById('selFont')
  const fontSelected = option[option.selectedIndex].value || 'f3'

  const positionSelected = ',g_north_west'

  const posx = document.getElementById('xPos').value || '0'
  const posy = document.getElementById('yPos').value || '0'

  const fontSize = document.getElementById('selSize').value || '50'

  const color = document.getElementById('fontColor').value || '000000'
  if (updateImage) {
    text = encodeURIComponent(text)
    img.src = 'https://res.cloudinary.com/mermaid/image/upload/l_text:CustomFont:' + fontSelected + '.ttf_' + fontSize + ':' + text + positionSelected + ',x_' + posx + ',y_' + posy + ',co_rgb:' + color + '/f_auto,q_auto/' + window.publicId
    // show the link
    const link = document.getElementById('link')
    link.innerHTML = img.src
  } else {
    // simulate the text
    const c = document.getElementById('canvas')
    const ctx = c.getContext('2d')
    ctx.font = fontSize + 'px Arial'
    ctx.fillText(text, posx, posy)
  }
}

var setCurrentValue = function () {
  const name = this.getAttribute('name')
  const value = this.value
  const span = document.getElementsByName(name + '_value')
  if (span && span.length > 0) {
    span[0].textContent = value
    span[0].style = 'color:red;'
  }
}

var locateMouse = function (e) {
  const xpos = document.getElementById('xPos')
  const ypos = document.getElementById('yPos')
  xpos.value = e.offsetX
  ypos.value = e.offsetY
}

var setCanvasImage = function (e) {
  const c = document.getElementById('canvas')
  const ctx = c.getContext('2d')
  const img = document.getElementById('img')
  c.height = img.naturalHeight + 10
  c.width = img.naturalWidth + 10
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.drawImage(img, 5, 5)
}

var resetCanvasImage = function () {
  const img = document.getElementById('img')
  img.src = 'https://res.cloudinary.com/mermaid/image/upload/f_auto,q_auto/' + window.publicId
}
