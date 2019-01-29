function sky() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateStars() {
    const starsAmount = canvasX + canvasY * 25; // This makes it proportional to the size of the canvas
    const generatedStars = [];
    for (let i = starsAmount; i >= 0; i--) {
      const red = getRandomInt(100, 255);
      const green = getRandomInt(100, 255);
      const blue = getRandomInt(100, 255);
      const alpha = getRandomInt(10, 100) / 100;
      const colorString = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
      const posX = getRandomInt(0, canvasX);
      const posY = getRandomInt(0, canvasX);
      const w = 1;
      const h = 1;
      const radius = 300;
      generatedStars.push({
        "rgba": colorString,
        "starPosX": posX,
        "starPosY": posY,
        "starW": w,
        "starH": h,
        "radius": radius
      });
    }
    return generatedStars;
  }

  const sparksLimit = 1000;
  let activeSparks = 0;
  const sparks = [];
  function fireSparks() {
    if (activeSparks >= sparksLimit) {
      return;
    }
    const red = 226;
    const green = 88;
    const blue = 34;
    const innerGreen = 184;
    const alpha = 0.8;
    const colorString = "rgba(" + red + "," + green + "," + blue + ",";// + alpha + ")";
    const posX = getRandomInt(0, canvasX);
    const posY = canvasY;
    const w = 6;
    const h = 8;
    const radius = 300;
    rect(posX, posY, w, h, radius);
    // Inner flame
    const colorStringInner = "rgba(" + red + "," + innerGreen + "," + blue + ",";// + alpha + ")";
    const innerPosX = posX+1.5;
    const innerPosY = posY+w-w/2;
    const innerW = w-w/2;
    const innerH = h-h/2;
    sparks.push({
      "rgb": colorString,
      "alpha": alpha,
      "rgbInner": colorStringInner,
      "sparkPosX": posX,
      "sparkPosY": posY,
      "sparkW": w,
      "sparkH": h,
      "innerPosX": innerPosX,
      "innerPosY": innerPosY,
      "innerW": innerW,
      "innerH": innerH,
      "radius": radius
    });
    activeSparks ++;
  }

  const starsArray = generateStars();
  function showStars() {
    noStroke();
    starsArray.forEach(star => {
      fill(star.rgba);
      rect(star.starPosX, star.starPosY, star.starW, star.starH, star.radius);
    });
  }
  function showSparks() {
    noStroke();
    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      const rand = Math.random();
      if (rand > 0.97) {
        spark.alpha -= 0.1;
      }
      if (rand < 0.01 && spark.alpha < 1) {
        spark.alpha += 0.1;
      }
      if (spark.alpha <= 0.1) {
        sparks.splice(i, 1);
        activeSparks --;
        continue;
      }
      const colorString = spark.rgb + spark.alpha + ")";
      fill(colorString);
      rect(spark.sparkPosX, spark.sparkPosY, spark.sparkW, spark.sparkH, spark.radius);
      const colorStringInner = spark.rgbInner + spark.alpha + ")";
      fill(colorStringInner);
      rect(spark.innerPosX, spark.innerPosY, spark.innerW, spark.innerH, spark.radius);
      // How often sparks will move (up, right, and left)
      let upSpeed = 0.15; // lower is faster
      if (rand > upSpeed) {
        spark.sparkPosY -= 1;
        spark.innerPosY -= 1;
      }
      let wind = null; // Can be null, left, or right
      let moveRightChance = 0.9;
      let moveLeftChance = 0.1;
      if (wind === "right") {
        moveRightChance = 0.99;
        moveLeftChance = 0.4;
      }else if (wind === "left") {
        moveRightChance = 0.6;
        moveLeftChance = 0.01;
      }
      if (rand > moveRightChance) {
        spark.sparkPosX -= 1;
        spark.innerPosX -= 1;
      }
      if (rand < moveLeftChance) {
        spark.sparkPosX += 1;
        spark.innerPosX += 1;
      }
    }
  }
  this.show = function() {
    showStars();
  }
  let img = null;
  this.update = function() {
    if (img) {
      image(img, 0, 0);
    }else {
      showStars();
      img = get();
    }
    fireSparks();
    showSparks();
  }
}
