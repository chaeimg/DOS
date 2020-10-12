const width = 335;
const h = 7;
const w = new ListWidget();
let fm = FileManager.iCloud();
let image = fm.readImage(fm.documentsDirectory() + "/mid_medium_progBG.PNG");
w.backgroundImage = image;

const now = new Date();
const weekday = now.getDay() == 0 ? 6 : now.getDay() - 1;
const minutes = now.getMinutes();
getwidget(24 * 60, (now.getHours() + 1) * 60 + minutes, "Day");
getwidget(7, weekday + 1, "Week");
getwidget(30, now.getDate() + 1, "Month");
getwidget(12, now.getMonth() + 1, "Year");




Script.setWidget(w);
Script.complete();

function getwidget(total, haveGone, str) {
  const titlew = w.addText(str);
  titlew.textColor = new Color("#EDEDED");
  titlew.font = Font.boldSystemFont(13);
  titlew.leftAlignText();
  w.addSpacer(6);
  const imgw = w.addImage(creatProgress(total, haveGone));
  imgw.imageSize = new Size(width, h);
  w.addSpacer(6);
}
function creatProgress(total, havegone) {
  const context = new DrawContext();
  context.size = new Size(width, h);
  context.opaque = false;
  context.respectScreenScale = true;
  context.setFillColor(new Color("#121212"));
  const path = new Path();
  path.addRoundedRect(new Rect(0, 0, width, h), 3, 2);
  context.addPath(path);
  context.fillPath();
  context.setFillColor(new Color("#EDEDED"));
  const path1 = new Path();
  path1.addRoundedRect(new Rect(0, 0, (width * havegone) / total, h), 3, 2);
  context.addPath(path1);
  context.fillPath();
  return context.getImage();
}
