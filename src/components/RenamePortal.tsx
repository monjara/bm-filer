import { useRenameContext } from '@/providers/RenameProvider'
import keys from '@/utils/keys'
import locale from '@/utils/locale'
import { type FormEvent, useCallback, useRef } from 'react'

export default function RenamePortal() {
  const { isRename, oldTitle, update, cancel } = useRenameContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback(
    (e: FormEvent) => {
      if (inputRef?.current) {
        inputRef.current.blur()
        update(inputRef.current.value)
        cancel()
        e.preventDefault()
      }
    },
    [update, cancel]
  )

  if (!isRename) {
    return null
  }

  return (
    <form className='rename_container' onSubmit={onSubmit}>
      <h4>{locale('rename_title')}</h4>
      <div className='rename_input_row'>
        <label htmlFor='title'>{locale('title')}</label>
        <input
          // biome-ignore lint/a11y/noAutofocus: <explanation>
          autoFocus={true}
          className='rename_input'
          ref={inputRef}
          defaultValue={oldTitle}
          name='title'
          id='title'
          type='text'
          onKeyDown={(e) => {
            if (e.key === keys.ESC) {
              if (inputRef.current) {
                inputRef.current.blur()
              }
              cancel()
            }
          }}
        />
      </div>
      <div className='rename_button_row'>
        <button className='rename_button_cancel' type='button' onClick={cancel}>
          {locale('cancel')}
        </button>
        <button className='rename_button_submit' type='submit'>
          {locale('save')}
        </button>
      </div>
    </form>
  )
}
