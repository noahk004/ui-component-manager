import React from 'react'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import UploadState from '@/components/UploadState'

const Create = () => {
  return (
    <div className="p-8"> {/* Maybe make padding and title position more consistent with other pages */}
      <h1 className="text-2xl font-bold mb-6">Create Component</h1>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2">Title</label>
            <input 
              type="text"
              className="w-full p-2 border bg-gray-200"
            />
          </div>
          
          <div className="flex-1">
            <label className="block mb-2">Type</label>
            <input 
              type="text"
              className="w-full p-2 border bg-gray-200"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea 
            className="w-full p-2 border bg-gray-200 h-32 resize-none"
          />
        </div>

        <div>
          <label className="block mb-2">Tags</label>
          <input 
            type="text"
            className="w-full p-2 border bg-gray-200"
          />
        </div>

        <div>
          <label className="block mb-2">File upload</label> {/* maybe move this to be side by side with tags */}
          {/* what is this supposed to say? */}
          <p className="text-sm mb-2">Upload the TS module containing the component. Ensure that c</p> 
          <button className="px-6 py-2 bg-gray-200">Choose file</button>
        </div>

        <UploadState state="loading" /> {/* states are success, loading, error */}

        <div>
          <p>Visibility</p>
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" className="form-checkbox w-4 h-4"/>
            <p className="text-sm">make my component private.</p>
          </label>
        </div>

        <button className="px-6 py-2 bg-gray-200">Create</button> 
      </div>
    </div>
  )
}

export default Create