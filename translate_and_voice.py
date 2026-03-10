from googletrans import Translator
import pyttsx3

translator = Translator()

with open("audio.txt","r") as f:
    text = f.read()

translated = translator.translate(text,dest="pt").text

engine = pyttsx3.init()
engine.save_to_file(translated,"voz.mp3")
engine.runAndWait()

print("Tradução concluída")
