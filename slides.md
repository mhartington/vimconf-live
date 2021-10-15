# Vim for the Frontend

- [twitter.com/mhartington](http://twitter.com/mhartington)
- [twitch.tv/mhartington](https://www.twitch.tv/mhartington)
---

## `whoami`

- Vim: 10 years, nvim: 7 years
- Front end + mobile
- HTML, CSS, JS, Swift, Kotlin

---

## Journey

- Dreamweaver (Designer days)
- Brackets/Atom
- WebStorm
- Atom (again)
- n/vim

---

<!-- .slide: data-auto-animate -->

## Why vim

---

<!-- .slide: data-auto-animate -->

## Why vim

## For Frontend?

---

- Speed
- Navigation
- Deep code integration

---

> All promised by "modern" editors

---

## Why vim

---

## Why nvim

---

## Obvious stuff
- LSP
- Treesitter

---

```lua
local servers = {'tsserver', 'html', 'cssls',}
for _, lsp in ipairs(servers) do
  lspconfig[lsp].setup()
end
```

---

```lua
lspconfig.jsonls.setup {
  settings = {
    json = {
      -- Schemas https://www.schemastore.org
      schemas = {
        {
          fileMatch = {"package.json"},
          url = "https://json.schemastore.org/package.json"
        },
        {
          fileMatch = {"tsconfig*.json"},
          url = "https://json.schemastore.org/tsconfig.json"
        },
        {
          fileMatch = {
            ".prettierrc",
            ".prettierrc.json",
            "prettier.config.json"
          },
          url = "https://json.schemastore.org/prettierrc.json"
        },
        {
          fileMatch = {".eslintrc", ".eslintrc.json"},
          url = "https://json.schemastore.org/eslintrc.json"
        },
        {
          fileMatch = {".babelrc", ".babelrc.json", "babel.config.json"},
          url = "https://json.schemastore.org/babelrc.json"
        },
        {
          fileMatch = {"lerna.json"},
          url = "https://json.schemastore.org/lerna.json"
        },
        {
          fileMatch = {"now.json", "vercel.json"},
          url = "https://json.schemastore.org/now.json"
        },
        {
          fileMatch = {
            ".stylelintrc",
            ".stylelintrc.json",
            "stylelint.config.json"
          },
          url = "http://json.schemastore.org/stylelintrc.json"
        }
      }
    }
  }
}

```

---

## Speed

### Gotta go fast

<img width="400" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/77ee2c66-febd-4bd4-bc2e-5f0d110fef5f/daqtoed-0a334159-ee66-4fd9-bbfb-bae599cf89ea.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi83N2VlMmM2Ni1mZWJkLTRiZDQtYmMyZS01ZjBkMTEwZmVmNWYvZGFxdG9lZC0wYTMzNDE1OS1lZTY2LTRmZDktYmJmYi1iYWU1OTljZjg5ZWEuZ2lmIn1dXX0.1IlT6YDwNgeeid7ylyL185AIAXXNtMWv-llB3dcbVMU">

---

- Time to start up?
- Editor performance?
- Language parsing?

---

All great, but over my head...

---

✅ Time to actually ship something

---

### [mattn/emmet-vim](http://github.com/mattn/emmet-vim)

```lua
packer.startup(
  function(use)
    use { "mattn/emmet-vim" }
  end
)
```

---

### Better mapping
```vim
function! s:expand_html_tab()

" try to determine if we're within quotes or tags.
" if so, assume we're in an emmet fill area.
 let line = getline('.')
 if col('.') < len(line)
   let line = matchstr(line, '[">][^<"]*\%'.col('.').'c[^>"]*[<"]')
   if len(line) >= 2
      return "\<C-n>"
   endif
 endif

" expand anything emmet thinks is expandable.
if emmet#isExpandable()
  return emmet#expandAbbrIntelligent("\<tab>")
endif

" return a regular tab character
return "\<tab>"

endfunction
```

---


### LSP and Emmet?
### [pedro757/emmet](https://github.com/pedro757/emmet)

```lua
--- npm install -g ls_emmet
local lspconfig = require'lspconfig'
local configs = require'lspconfig/configs'

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true

configs.ls_emmet = {
  default_config = {
    cmd = { 'ls_emmet', '--stdio' };
    filetypes = { 'html', 'css', 'scss', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'haml',
      'xml', 'xsl', 'pug', 'slim', 'sass', 'stylus', 'less', 'sss'};
    root_dir = function(fname)
      return vim.loop.cwd()
    end;
    settings = {};
  };
}

lspconfig.ls_emmet.setup{ capabilities = capabilities }
```

---

### [terrortylor/nvim-comment](http://github.com/terrortylor/nvim-comment)

```lua
use {"JoosepAlviste/nvim-ts-context-commentstring"}
use {
  "terrortylor/nvim-comment",
  config = function()
    require("nvim_comment").setup(
      {
        hook = function()
          require("ts_context_commentstring.internal").update_commentstring()
        end
      }
    )
  end
}
```

---

### [mhartington/formatter.nvim](https://github.com/mhartington/formatter.nvim)

```lua
use {"mhartington/formatter.nvim", config = function()
  require("formatter").setup {
    {
      filetype = {
        typescript = {
          function()
            return {
              exe = "prettier",
              args = { "--stdin-filepath", vim.api.nvim_buf_get_name(0) },
              stdin = true
            }
          end
        }
      }
    }
  }
end }
```

---

## Navigation

---

<p> Possibly controversial </p>
<p class="fragment fade-up"> I like file explorers...</p>
<p class="fragment fade-up">But I also like fuzzy finders</p>

---

### File explorer

- New project
- Unfamiliar setup
- Better visualization

---

### Fuzzy Finder

- Familiar project
- Consistent project setup
- Better for abstract

---

### [nvim-telescope/telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)

```lua
  use {"nvim-telescope/telescope.nvim"}
  use {"nvim-telescope/telescope-fzy-native.nvim"}

  use {"nvim-telescope/telescope-packer.nvim"}
  use {"nvim-telescope/telescope-node-modules.nvim"}
```

<small>Thanks TJ and crew</small>

---

### [Xuyuanp/yanil](https://github.com/Xuyuanp/yanil)

```lua
  use {"Xuyuanp/yanil"}
```

"A lib to build your own NERDTree"

---

## Deep code integration

---

Beyond a file, but whole projects

---

Yes, this includes LSP, but also more

---

### Git integrations

```lua
-- Git UI
use { "TimUntersberger/neogit" }

-- GitHub UI
-- Telescope Extension!
use { "pwntester/octo.nvim",
  config = function()
    require "octo".setup()
  end
}
```
---

### Dependency Managment

```lua
use { "vuki656/package-info.nvim" }
```

---

### non-extensive list

---

- TJ stream with Nick Nisi
  - https://youtu.be/tAVxxdFFYMU
- ThePrimeagen (~40mins in)
  - https://www.twitch.tv/videos/1176587022
- Elijah Manor
  - https://elijahmanor.com/blog/neovim-tmux

---

### how do you do frontend in vim?

---

### Thank you
## &lt;/html&gt;


