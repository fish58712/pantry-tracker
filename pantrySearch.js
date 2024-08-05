import * as React from 'react'
import { Paper, InputBase, IconButton, Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function PantrySearch({ items, onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(term)
    )
    onSearch(filteredItems)
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,left:-8, }}
    >
    <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Items"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchTerm}
        onChange={handleSearch}

      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
      
      </IconButton>
    </Paper>
  )
}
