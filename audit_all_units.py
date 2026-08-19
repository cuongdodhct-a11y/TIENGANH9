import re
import os
import glob

units_dir = "src/data/units"

print("=" * 60)
print("AUDITING ALL 12 UNITS")
print("=" * 60)

total_vocab = 0
total_grammar = 0
total_listening_mc = 0
total_listening_fib = 0
total_speaking = 0
total_reading_qs = 0
total_writing = 0

all_vocab_words = set()
all_grammar_qs = set()
all_speaking_sentences = set()
all_reading_qs = set()
duplicate_warnings = []

for u in range(1, 13):
    filename = f"{units_dir}/unit{u}.ts"
    if not os.path.exists(filename):
        print(f"[ERROR] Missing {filename}!")
        continue
    
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check sections
    # Extract arrays
    vocab_matches = re.findall(r'\{\s*"id":\s*"u\d+-v\d+",\s*"word":\s*"([^"]+)"', content)
    grammar_matches = re.findall(r'\{\s*"id":\s*"u\d+-g\d+",\s*"question":\s*"([^"]+)"', content)
    speaking_matches = re.findall(r'\{\s*"id":\s*"u\d+-s\d+",\s*"targetSentence":\s*"([^"]+)"', content)
    reading_matches = re.findall(r'\{\s*"id":\s*"u\d+-r\d+",\s*"question":\s*"([^"]+)"', content)
    fib_matches = re.findall(r'\{\s*"id":\s*"u\d+-f\d+",\s*"sentenceWithBlank":\s*"([^"]+)"', content)
    mc_matches = re.findall(r'\{\s*"id":\s*"u\d+-l\d+",\s*"question":\s*"([^"]+)"', content)
    writing_matches = re.findall(r'\{\s*"id":\s*"u\d+-w\d+",\s*"title":\s*"([^"]+)"', content)
    
    v_len = len(vocab_matches)
    g_len = len(grammar_matches)
    s_len = len(speaking_matches)
    r_len = len(reading_matches)
    fib_len = len(fib_matches)
    mc_len = len(mc_matches)
    w_len = len(writing_matches)
    
    print(f"Unit {u:2d}: Vocab={v_len:2d}/20, Grammar={g_len:2d}/20, Listening(MC={mc_len}/8, FIB={fib_len}/4), Speaking={s_len:2d}/20, Reading={r_len:2d}/10, Writing={w_len:2d}/5")
    
    total_vocab += v_len
    total_grammar += g_len
    total_speaking += s_len
    total_reading_qs += r_len
    total_listening_mc += mc_len
    total_listening_fib += fib_len
    total_writing += w_len
    
    # Check duplicates
    for w in vocab_matches:
        w_lower = w.strip().lower()
        if w_lower in all_vocab_words:
            duplicate_warnings.append(f"Duplicate Vocab: '{w}' in Unit {u}")
        all_vocab_words.add(w_lower)
        
    for q in grammar_matches:
        q_norm = q.strip().lower()
        if q_norm in all_grammar_qs:
            duplicate_warnings.append(f"Duplicate Grammar: '{q[:30]}...' in Unit {u}")
        all_grammar_qs.add(q_norm)
        
    for s in speaking_matches:
        s_norm = s.strip().lower()
        if s_norm in all_speaking_sentences:
            duplicate_warnings.append(f"Duplicate Speaking: '{s[:30]}...' in Unit {u}")
        all_speaking_sentences.add(s_norm)

print("=" * 60)
print(f"TOTALS:")
print(f"Vocabulary: {total_vocab} / 240")
print(f"Grammar:    {total_grammar} / 240")
print(f"Listening:  {total_listening_mc} MC / 96, {total_listening_fib} FIB / 48")
print(f"Speaking:   {total_speaking} / 240")
print(f"Reading:    {total_reading_qs} / 120")
print(f"Writing:    {total_writing} / 60")
print("=" * 60)

if duplicate_warnings:
    print(f"DUPLICATE WARNINGS ({len(duplicate_warnings)}):")
    for dw in duplicate_warnings:
        print(f"  - {dw}")
else:
    print("ZERO DUPLICATES DETECTED! PERFECT!")
