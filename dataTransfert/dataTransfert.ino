
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() == 0 )return;
  String s = readString();
  char c = s.charAt(0);
  s.remove(0, 1);
  while (s.length() > 0 ) {
    Serial.write(s.charAt(0));
    s.remove(0, 1);
  }
  Serial.write('\n');
}

String readString() {
  String content = "";
  char character;
  while (true) {
    if (Serial.available()) {
      character = Serial.read();
      if (character == '\n')break;
      else content.concat(character);
    }

  }
  return content;
}
