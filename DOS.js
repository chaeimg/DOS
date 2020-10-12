const width = 335;
const height = 6;
const DOS = new ListWidget();
const fm = FileManager.iCloud();
const image = fm.readImage(`${fm.documentsDirectory()}/DOS_medBG.PNG`);
DOS.backgroundImage = image;

function getBattLevel() {
  const batteryLevelRaw = Device.batteryLevel();
  const batteryLevel = batteryLevelRaw * 100;
}

function addProgElement(total, past, str) {
  const progText = DOS.addText(str);
  const progImage = DOS.addImage(createProgImage(total, past));
  progText.textColor = new Color('#EDEDED');
  progText.font = Font.boldSystemFont(13);
  progText.leftAlignText();
  DOS.addSpacer(6);
  progImage.imageSize = new Size(width, height);
  DOS.addSpacer(6);
}

function createProgImage(total, past) {
  const progContext = new DrawContext();
  progContext.size = new Size(width, height);
  progContext.opaque = false;
  progContext.respectScreenScale = true;
  progContext.setFillColor(new Color('#121212'));
  const progPathBG = new Path();
  progPathBG.addRoundedRect(new Rect(0, 0, width, height), 3, 2);
  progContext.addPath(progPathBG);
  progContext.fillPath();
  progContext.setFillColor(new Color('#EDEDED'));
  const progPath = new Path();
  progPath.addRoundedRect(new Rect(0, 0, (width * past) / total, height), 3, 2);
  progContext.addPath(progPath);
  progContext.fillPath();
  return progContext.getImage();
}

const now = new Date();
const weekday = now.getDay() == 0 ? 6 : now.getDay() - 1;
const minutes = now.getMinutes();
getwidget(24 * 60, (now.getHours() + 1) * 60 + minutes, 'Day');
getwidget(7, weekday + 1, 'Week');
getwidget(30, now.getDate() + 1, 'Month');
getwidget(12, now.getMonth() + 1, 'Year');

Script.setWidget(DOS);
Script.complete();
