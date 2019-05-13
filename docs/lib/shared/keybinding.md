<a name="parseKeyCombo"></a>

## parseKeyCombo(combo, delimit) ⇒
Takes an keyboard combo in the HotKeys format and breaks it up into its
constituent parts.  It returns a `KeyCombo` structure that represents
that combo.  This structure includes:

- .altKey {boolean}
- .ctrlKey {boolean}
- .key {string}
- .metaKey {boolean}
- .shiftKey {boolean}

**Kind**: global function  
**Returns**: a `KeyCombo` structure that contains the new key parts.  
**Params**

- combo <code>string</code> - the keyboard combo keys to parse
- delimit <code>string</code> <code> = &quot;\&quot;+\&quot;&quot;</code> - the characters that separates each part of
the combo input key.  Used to separate it into parts.

