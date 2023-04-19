import React, { useState } from 'react'

import { Meeting, getTimeDiff } from '@recap/shared'

import { ThumbsDown, ThumbsUp } from '../../buttons'

import { Message } from '@recap/shared/src/storage/meetings/conversation'
import listInCircle from '../../../assets/img/listInCircle.svg'
import matt from '../../../assets/img/matt.png'

interface Props {
  meetingDetails: Meeting
}

export default function Transcript({ meetingDetails: { start, end, conversation } }: Props) {
  const [like, setLike] = useState(0)

  function onSetLike(v: 1 | -1 | 0) {
    setLike(v)
  }

  return (
    <div className="sm:mb-[82px] mb-[60px]">
      <div className="flex justify-between sm:mb-[34px] mb-[24px]">
        <div className="flex gap-[12px]">
          <img src={listInCircle} alt="" />
          <div className="font-semibold">Transcript</div>
          <div className="font-semibold text-gray-500">{getTimeDiff(start, end)}</div>
        </div>
        <div className="flex gap-[12px]">
          <ThumbsDown checked={like === -1} onClick={() => onSetLike(-1)} />
          <ThumbsUp checked={like === 1} onClick={() => onSetLike(1)} />
        </div>
      </div>
      <div className="flex flex-col sm:gap-[40px] gap-[30px]">
        {conversation.map((transcript: Message, key: number) => (
          <TranscriptItem key={key} transcript={transcript} />
        ))}
      </div>
    </div>
  )
}

const TranscriptItem = ({ transcript: { speaker, text } }: any) => {
  return (
    <div className="flex sm:gap-[16px] gap-[12px]">
      <img src={matt} alt="" className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]" />
      <div className="flex flex-col sm:gap-[10px] gap-[6px]">
        <div className="font-semibold">{speaker}</div>
        <div className="text-gray-500">{text}</div>
      </div>
    </div>
  )
}
