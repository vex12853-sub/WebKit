/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

#ifndef WorkerContext_h
#define WorkerContext_h

#if ENABLE(WORKERS)

#include "KURL.h"
#include "ScriptExecutionContext.h"
#include "WorkerScriptController.h"
#include <wtf/PassRefPtr.h>
#include <wtf/RefCounted.h>
#include <wtf/RefPtr.h>

namespace WebCore {

    class WorkerLocation;

    class WorkerContext : public RefCounted<WorkerContext>, public ScriptExecutionContext {
    public:
        static PassRefPtr<WorkerContext> create(const KURL& url)
        {
            return adoptRef(new WorkerContext(url));
        }

        virtual ~WorkerContext();

        virtual bool isWorkerContext() const { return true; }

        const KURL& url() const { return m_url; }
        virtual KURL completeURL(const String&) const;
        virtual SecurityOrigin* securityOrigin() const { return m_securityOrigin.get(); }

        WorkerLocation* location() const { return m_location.get(); }

        WorkerScriptController* script() { return &m_script; }

        using RefCounted<WorkerContext>::ref;
        using RefCounted<WorkerContext>::deref;

    private:
        virtual void refScriptExecutionContext() { ref(); }
        virtual void derefScriptExecutionContext() { deref(); }

        WorkerContext(const KURL& url);

        virtual const KURL& virtualURL() const;

        KURL m_url;
        RefPtr<WorkerLocation> m_location;
        RefPtr<SecurityOrigin> m_securityOrigin;

        WorkerScriptController m_script;
    };

} // namespace WebCore

#endif // ENABLE(WORKERS)

#endif // WorkerContext_h
