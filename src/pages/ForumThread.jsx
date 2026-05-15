import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, Share2, MoreHorizontal, MessageSquarePlus } from 'lucide-react';
import { allDiscussions, mockComments } from '../data/mockForum';
import { useAuth } from '../context/AuthContext';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import './ForumThread.css';

const CommentNode = ({ comment, onReply, depth = 0, user, navigate }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (liked) {
      setLikesCount(c => c - 1);
      setLiked(false);
    } else {
      setLikesCount(c => c + 1);
      setLiked(true);
    }
  };

  const submitReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <div className={`forum-comment ${depth > 0 ? 'is-reply' : ''}`}>
      <div className="comment-thread-line"></div>
      <div className="comment-content-area">
        <div className="comment-header">
          <div className="comment-author-avatar">{comment.author.charAt(0)}</div>
          <span className="comment-author-name">{comment.author}</span>
          <span className="comment-meta-dot">&bull;</span>
          <span className="comment-time">{comment.timestamp}</span>
        </div>
        
        <div className="comment-body">
          <p>{comment.text}</p>
        </div>
        
        <div className="comment-actions">
          <button className={`comment-action-btn ${liked ? 'active' : ''}`} onClick={handleLike}>
            <Heart size={14} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : 'currentColor'} /> 
            <span>{likesCount}</span>
          </button>
          <button className="comment-action-btn" onClick={() => {
            if (!user) {
              navigate('/login');
            } else {
              setShowReplyForm(!showReplyForm);
            }
          }}>
            <MessageSquarePlus size={14} /> <span>Balas</span>
          </button>
          <button className="comment-action-btn">
            <MoreHorizontal size={14} />
          </button>
        </div>

        {showReplyForm && (
          <form className="comment-reply-form" onSubmit={submitReply}>
            <textarea 
              rows={3} 
              placeholder={`Membalas ${comment.author}...`}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              autoFocus
            />
            <div className="reply-form-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowReplyForm(false)}>Batal</button>
              <button type="submit" className="btn-submit">Kirim Balasan</button>
            </div>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-children">
            {comment.replies.map(reply => (
              <CommentNode key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} user={user} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ForumThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const threadId = parseInt(id, 10);
  const threadData = allDiscussions.find(d => d.id === threadId);
  const [thread, setThread] = useState(threadData);
  const [comments, setComments] = useState(mockComments[threadId] || []);
  const [mainReply, setMainReply] = useState('');
  const [threadLiked, setThreadLiked] = useState(false);
  const [threadLikes, setThreadLikes] = useState(threadData?.likes || 0);

  usePageTitle(thread?.title || 'Forum Diskusi');

  useEffect(() => {
    if (!thread) {
      // Check if it's a newly created dummy from local state
      // (For this mock, newly created threads won't have initial local state unless we lift it up)
      // Here we just handle undefined by showing a not found message.
    }
  }, [thread]);

  if (!thread) {
    return (
      <div className="forum-thread-page" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Diskusi tidak ditemukan</h2>
        <p>Utas ini mungkin telah dihapus atau tidak tersedia.</p>
        <button onClick={() => navigate('/community')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Kembali ke Komunitas
        </button>
      </div>
    );
  }

  const toggleThreadLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (threadLiked) {
      setThreadLikes(c => c - 1);
      setThreadLiked(false);
    } else {
      setThreadLikes(c => c + 1);
      setThreadLiked(true);
    }
  };

  // Helper to add nested reply recursively
  const addReplyToNode = (nodes, parentId, newComment) => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          replies: [...(node.replies || []), newComment]
        };
      }
      if (node.replies) {
        return {
          ...node,
          replies: addReplyToNode(node.replies, parentId, newComment)
        };
      }
      return node;
    });
  };

  const handleNestedReply = (parentId, text) => {
    const newComment = {
      id: Date.now(),
      author: 'Anda',
      text: text,
      likes: 0,
      timestamp: 'Baru saja',
      replies: []
    };
    setComments(prev => addReplyToNode(prev, parentId, newComment));
  };

  const handleMainReply = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!mainReply.trim()) return;
    const newComment = {
      id: Date.now(),
      author: 'Anda',
      text: mainReply,
      likes: 0,
      timestamp: 'Baru saja',
      replies: []
    };
    setComments([newComment, ...comments]);
    setMainReply('');
  };

  return (
    <div className="forum-thread-page">
      <SEOHead title={thread.title} />
      
      <div className="thread-container">
        {/* Breadcrumb / Back Button */}
        <div className="thread-nav">
          <Link to="/community" className="back-link">
            <ArrowLeft size={18} /> Kembali ke Komunitas
          </Link>
        </div>

        {/* Main Post (Original Post) */}
        <div className="thread-op">
          <div className="thread-op-header">
            <span className="thread-op-category">{thread.category}</span>
            <span className="thread-op-time">{thread.timestamp || 'Baru saja'}</span>
          </div>
          
          <h1 className="thread-op-title">{thread.title}</h1>
          
          <div className="thread-op-author">
            <div className="thread-avatar">{thread.author.charAt(0)}</div>
            <div className="thread-author-info">
              <span className="author-name">{thread.author}</span>
              <span className="author-badge">Author</span>
            </div>
          </div>

          <div className="thread-op-body">
            {thread.image && (
              <div className="thread-op-image">
                <img src={thread.image} alt={thread.title} />
              </div>
            )}
            <div className="thread-op-text">
              {thread.content ? thread.content.split('\n').map((para, i) => <p key={i}>{para}</p>) : <p>Deskripsi topik tidak tersedia.</p>}
            </div>
          </div>

          <div className="thread-op-actions">
            <button className={`op-action-btn ${threadLiked ? 'active' : ''}`} onClick={toggleThreadLike}>
              <Heart size={18} fill={threadLiked ? '#ef4444' : 'none'} color={threadLiked ? '#ef4444' : 'currentColor'} /> 
              <span>{threadLikes} Suka</span>
            </button>
            <div className="op-action-btn static">
              <MessageCircle size={18} /> 
              <span>{thread.comments} Komentar</span>
            </div>
            <button className="op-action-btn" onClick={() => {
              if (navigator.share) {
                navigator.share({ title: thread.title, url: window.location.href });
              }
            }}>
              <Share2 size={18} /> 
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="thread-comments-section">
          <h3>Komentar & Diskusi</h3>
          
          {/* Main Reply Input */}
          <form className="thread-main-reply" onSubmit={handleMainReply}>
            <div className="reply-avatar">A</div>
            <div className="reply-input-box">
              <textarea 
                rows={4} 
                placeholder="Tulis pendapat atau balasan Anda untuk topik ini..."
                value={mainReply}
                onChange={e => setMainReply(e.target.value)}
              />
              <div className="reply-form-footer">
                <span className="reply-guidelines">
                  Gunakan bahasa yang membangun dan penuh kasih (Efesus 4:29).
                </span>
                <button type="submit" disabled={!mainReply.trim()}>Kirim Komentar</button>
              </div>
            </div>
          </form>

          {/* Comments Tree */}
          <div className="comments-tree">
            {comments.length === 0 ? (
              <div className="comments-empty">
                <MessageCircle size={40} color="#cbd5e1" />
                <p>Belum ada yang berdiskusi. Jadilah yang pertama memberikan komentar!</p>
              </div>
            ) : (
              comments.map(comment => (
                <CommentNode key={comment.id} comment={comment} onReply={handleNestedReply} user={user} navigate={navigate} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForumThread;
