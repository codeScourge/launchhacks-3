import markdown
import html

# --- The Page Class, holds a List of Pairs ---
class Page:
    def __init__(self, pairs:list, completion_js:str):
        self.pairs = pairs
        self.completion_js = str

    def render(self):
        """
        For each pair, check if it is content or a quiz, then generate the appropriate button
        If it is the last one, add the user submitted JavaScript for completion
        """
        pass



# --- The Pair Class, holds Content and Quiz ---

# --- Content Class ---
class Content:
    pass

# --- Content Classes ---
class Text:
    def __init__(self, markdown_text:str):
        self.markdown_text = markdown_text

    def render(self):
        return markdown.markdown(self.markdown_text)


class Image:
    def __init__(self, path:str, alt:str):
        self.path = path
        self.alt = alt

    def render(self):
        return f'<img src="{self.path}" alt="{self.alt}">'


# --- Quiz Class ---
class Quiz:
    pass


# --- Quiz Classes ---