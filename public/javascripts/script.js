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

function fetchFontDetails () {

}

// adding for overlay route
function setSliderValue (i = 0) {
  // loop through the sliders and set the value if there is a mismatch in displayed value to slider value
  const sliders = document.getElementsByClassName('fontSize')
  const spans = document.getElementsByClassName('showFontSize')
  for (i = 0; i < sliders.length; i++) {
    if (sliders[i].value !== spans[i].textContent) {
      spans[i].textContent = sliders[i].value
      spans[i].style = 'color:red;'
    }
  }
}

function setMousePosition (e) {
  const positionsX = document.getElementsByClassName('positionX')
  const positionsY = document.getElementsByClassName('positionY')

  if ('mouseTrackerEnabled' in window.config) {
    const lineEnabled = window.config.mouseTrackerEnabled
    positionsX[lineEnabled].value = e.offsetX
    positionsY[lineEnabled].value = e.offsetY
  }
}


function insertHandler(e) {
  const img = document.getElementById('img')
  window.publicId = e.assets[0].public_id
  img.src = 'https://res.cloudinary.com/mermaid/image/upload/f_auto,q_auto/' + e.assets[0].public_id
}

function previewTransformation(){
  const messages = getElements('message')
  const fonts = getFonts()
  const fontSizes = getElements('fontSize')
  const fontColors = getElements('fontColor')  
  const posXs = getElements('positionX')
  const posYs = getElements('positionY')

  console.log(`Processing ${messages.length} messages`)
  for (let i=0; i<messages.length; i++) {
    //we have 3 messages - so check each and render each one
    renderTextOnCanvas(
      messages[i],
      fontSizes[i],
      fontColors[i],
      posXs[i],
      posYs[i]
    )    
  }

}

function generateTransformation(){
  const messages = getElements('message')
  const fonts = getFonts()
  const fontSizes = getElements('fontSize')
  const fontColors = getElements('fontColor')  
  const posXs = getElements('positionX')
  const posYs = getElements('positionY')

  let transformations = Array(messages.length)
  //generate 1st transformation string
  for (let i=0; i<messages.length; i++){
    if(messages[i] && messages[i]!=''){
      transformations[i] = `l_text:CustomFont:${fonts[i]}.ttf_${fontSizes[i]}:${encodeURIComponent(encodeURIComponent(messages[i]))},x_${posXs[i]},y_${posYs[i]},g_north_west,co_rgb:${fontColors[i]}`      
    }
  }
  const url = `https://res.cloudinary.com/mermaid/image/upload/${transformations.join('/').replace('//','/')}/f_auto,q_auto/${window.publicId}`
  const img = document.getElementById('img')
  img.src = url
  const link = document.getElementById('link')
  link.innerHTML = img.src
  
}

function clearTransformation() {
  console.log(
    'Clear a transform'
  )

}

// helper functions to get each of the values

function getFonts() {
  const fontSelectors = document.getElementsByClassName('fontFace')
  let fonts = Array(fontSelectors.length)

  for(let i=0; i<fonts.length; i++) {
    const element = fontSelectors[i]
    fonts[i] = element[element.selectedIndex].value
  }
  return fonts
}

function getElements(elementName) {
  const elements = document.getElementsByClassName(elementName)
  let values = Array(elements.length)  
  for(let i=0; i<values.length; i++){
    values[i] = elements[i].value || ''
  }
  return values
}

function renderTextOnCanvas(text, fontSize, fontColor="999999", posx, posy){
  const c = document.getElementById('canvas')
  const ctx = c.getContext('2d')
  ctx.font = fontSize + 'px Arial'
  ctx.fillStyle = '#' + fontColor
  ctx.fillText(text, posx, posy)
}