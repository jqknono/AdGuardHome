#!/usr/bin/env python3

import json
import os
from collections import defaultdict

def parse_markdown_table(file_path):
    """解析markdown表格文件，返回语言数据"""
    languages = []
    translations = defaultdict(dict)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # 跳过可能的文件头部注释
    for i, line in enumerate(lines):
        if line.startswith('| Key |'):
            header_line = line
            separator_line = lines[i + 1]
            content_lines = lines[i + 2:]
            break
    
    # 解析表头获取语言列表
    headers = [h.strip() for h in header_line.split('|')]
    languages = headers[2:-1]  # 跳过'Key'列和空列
    
    # 解析内容行
    for line in content_lines:
        if not line.strip() or not line.startswith('|'):
            continue
            
        cols = [col.strip() for col in line.split('|')[1:-1]]
        if len(cols) < 2:
            continue
            
        key = cols[0]
        for i, lang in enumerate(languages):
            if i + 1 < len(cols):
                value = cols[i + 1]
                if value:  # 只保存非空的翻译
                    # 处理markdown表格中的特殊字符
                    value = value.replace('\\|', '|')
                    value = value.replace('<br>', '\n')
                    translations[lang][key] = value

    return languages, translations

def create_nested_dict(flat_dict):
    """将扁平的键值对转换为嵌套的字典结构"""
    nested = {}
    for key, value in flat_dict.items():
        parts = key.split('.')
        current = nested
        for part in parts[:-1]:
            current = current.setdefault(part, {})
        current[parts[-1]] = value
    return nested

def save_language_files(translations, output_dir):
    """保存各个语言的JSON文件"""
    os.makedirs(output_dir, exist_ok=True)
    
    for lang, trans in translations.items():
        # 转换为嵌套的字典结构
        nested_trans = create_nested_dict(trans)
        
        # 保存为JSON文件
        output_file = os.path.join(output_dir, f'{lang}.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(nested_trans, f, ensure_ascii=False, indent=2)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(script_dir, 'i18n_table.md')
    output_dir = os.path.join(script_dir, '../../client/src/__locales')
    
    languages, translations = parse_markdown_table(input_file)
    save_language_files(translations, output_dir)
    
    print(f"Successfully generated i18n files for {len(languages)} languages")
    print(f"Files have been saved to: {output_dir}")

if __name__ == "__main__":
    main()