-- Create notifications table for real-time user notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('health_reminder', 'appointment', 'lab_result', 'medication', 'family_update', 'milestone')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_id UUID,
  related_type TEXT,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage all notifications" 
ON public.notifications FOR ALL 
USING (is_super_admin(auth.uid()));

-- Create family connections table
CREATE TABLE public.family_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  connected_user_id UUID,
  invited_email TEXT,
  relationship TEXT NOT NULL,
  connection_status TEXT NOT NULL DEFAULT 'pending' CHECK (connection_status IN ('pending', 'accepted', 'blocked')),
  mutual_sharing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.family_connections ENABLE ROW LEVEL SECURITY;

-- RLS policies for family connections
CREATE POLICY "Users can manage their own family connections" 
ON public.family_connections FOR ALL 
USING (auth.uid() = user_id OR auth.uid() = connected_user_id)
WITH CHECK (auth.uid() = user_id OR auth.uid() = connected_user_id);

-- Create family health shares table
CREATE TABLE public.family_health_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  shared_with_user_id UUID NOT NULL,
  health_data_type TEXT NOT NULL CHECK (health_data_type IN ('timeline_event', 'lab_result', 'medication', 'appointment', 'full_profile')),
  related_id UUID,
  permission_level TEXT NOT NULL DEFAULT 'view' CHECK (permission_level IN ('view', 'comment', 'emergency_only')),
  expires_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'revoked')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.family_health_shares ENABLE ROW LEVEL SECURITY;

-- RLS policies for family health shares
CREATE POLICY "Users can manage their own health shares" 
ON public.family_health_shares FOR ALL 
USING (auth.uid() = user_id OR auth.uid() = shared_with_user_id)
WITH CHECK (auth.uid() = user_id OR auth.uid() = shared_with_user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_family_connections_updated_at
  BEFORE UPDATE ON public.family_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_family_health_shares_updated_at
  BEFORE UPDATE ON public.family_health_shares
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for notifications
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;