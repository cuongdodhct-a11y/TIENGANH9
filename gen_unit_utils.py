import json
import os

# Unit definitions generator for Units 1 to 6
def make_unit(uid, title, theme, desc, pron_focus, badge_icon, vocab, grammar_info, grammar_exs, listening_info, listening_qs, listening_fibs, speaking, reading_info, reading_qs, writing_prompts):
    return {
        "id": uid,
        "title": title,
        "theme": theme,
        "description": desc,
        "pronunciationFocus": pron_focus,
        "badgeIconName": badge_icon,
        "vocabulary": vocab,
        "grammar": {
            "title": grammar_info["title"],
            "summary": grammar_info["summary"],
            "formulaBox": grammar_info["formulaBox"],
            "usagePoints": grammar_info["usagePoints"],
            "exercises": grammar_exs
        },
        "listening": {
            "audioTitle": listening_info["audioTitle"],
            "audioDuration": listening_info["audioDuration"],
            "audioScriptSpeaker": listening_info["audioScriptSpeaker"],
            "transcriptText": listening_info["transcriptText"],
            "vietnameseTranslation": listening_info["vietnameseTranslation"],
            "questions": listening_qs,
            "fillInBlankExercises": listening_fibs
        },
        "speakingPrompts": speaking,
        "reading": {
            "title": reading_info["title"],
            "topic": reading_info["topic"],
            "passageText": reading_info["passageText"],
            "keyVocabularyHighlights": reading_info["keyVocabularyHighlights"],
            "questions": reading_qs
        },
        "writing": writing_prompts[0],
        "writingPrompts": writing_prompts
    }

def write_ts_unit(uid, data):
    ts_code = f'import {{ UnitData }} from "../../types";\n\nexport const UNIT_{uid}_DATA: UnitData = {json.dumps(data, indent=2, ensure_ascii=False)};\n'
    filepath = f'src/data/units/unit{uid}.ts'
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f"Generated unit{uid}.ts successfully!")

EOF_CHECK = True
