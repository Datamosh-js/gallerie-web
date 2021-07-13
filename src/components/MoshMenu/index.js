import { Button } from 'react-bootstrap'
import UploadImage from '../UploadImage'

import './mosh.css'

const MoshMenu = props => {
  const { modes, onClickUpload, isLoading, onFileChange } = props

  return (
    <div id='mosh-menu'>
      <div>
        <UploadImage onFileChange={onFileChange} />
      </div>
      <br />
      <ul>
        {modes.map((mode, i) => (
          <li key={i}>
            <Button
              onClick={onClickUpload.bind(null, mode)}
              disabled={isLoading}
            >
              {mode}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoshMenu
